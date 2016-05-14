interface IHeracles {
    resourceFactory:IResourceFactory;
    loadResource(uri:string):Promise<IHydraResource>;
}

interface IResource {
    id:string
}

interface IApiDocumentation extends IResource {
    classes:Array<IClass>;
    getClass(classId:string):IClass;
    getOperations(classUri:string):Array<IOperation>;
    getProperties(classUri:string):Array<ISupportedProperty>;
    getEntrypoint:Promise<IHydraResource>
}

interface IClass extends IResource {
    supportedOperations:Array<IOperation>;
    supportedProperties:Array<ISupportedProperty>;
}

interface IDocumentedResource extends IResource {
    title:string;
    description:string;
    compact(context:any = null):Object;
}

interface ISupportedProperty extends IDocumentedResource {
    readable:boolean;
    writable:boolean;
    required:boolean;
    property:Object;
}

interface IOperation extends IDocumentedResource {
    method:string;
    expects:string;
    returns:string;
    getExpected():Promise<IClass>;
    getReturned():Promise<IClass>;
}

interface IHydraResource extends IResource {
    getOperations():Promise<Array<IOperation>>
    apiDocumentation:IApiDocumentation;
}

interface IPartialCollectionView extends IHydraResource {
    first:IHydraResource;
    previous:IHydraResource;
    next:IHydraResource;
    last:IHydraResource;
    collection:IHydraResource;
}

interface IResourceFactory {
    createResource(heracles:IHeracles, obj:Object, apiDocumentation:IApiDocumentation, resources, typeOverride?:string):IResource
}

var Hydra:IHeracles;
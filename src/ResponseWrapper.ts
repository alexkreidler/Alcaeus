import * as li from 'parse-link-header';
import * as Constants from './Constants';
import nonenumerable from './helpers/nonenumerable';

export interface IResponseWrapper {
    mediaType: string;
    apiDocumentationLink: string;
    redirectUrl: string;
    xhr: Response;
}

export class ResponseWrapper implements IResponseWrapper {
    @nonenumerable
    private readonly originalResponse: Response;

    constructor(res: Response) {
        this.originalResponse = res;
    }

    get xhr() {
        return this.originalResponse.clone();
    }

    get status(): number {
        return this.xhr.status;
    }

    get apiDocumentationLink(): string {
        if (this.xhr.headers.has(Constants.Headers.Link)) {
            const linkHeaders = this.xhr.headers.get(Constants.Headers.Link);
            const links = li(linkHeaders);

            if (links[Constants.Core.Vocab('apiDocumentation')]) {
                return links[Constants.Core.Vocab('apiDocumentation')].url;
            }
        }

        return null;
    }

    get mediaType(): string {
        return this.xhr.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;
    }

    get redirectUrl(): string {
        if (this.xhr.redirected) {
            return this.xhr.url;
        }

        return null;
    }
}
import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { TokenStorageService } from "../Services/token-storage.service";
import { NetworkCallService } from "../Services/NetworkCall.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private inject: Injector) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authreq = req;
        let storageService = this.inject.get(TokenStorageService);

        const token = storageService.getToken();
        // const excludedUrls = ['/authenticate'];
        // if (excludedUrls.indexOf(req.url) !== -1) {
        //     return next.handle(req);
        // }
        if (token) {
            return next.handle(this.addTokenHeader(req, token));
        }


        return next.handle(authreq).pipe(
            catchError(errordata => {
                if (errordata.status === 401) {
                    return this.handleRefreshToken(req, next);
                }
                return throwError(errordata);
            })
        );
    }
    handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
        let networkService = this.inject.get(NetworkCallService);
        let storageService = this.inject.get(TokenStorageService);
        return networkService.GenerateRefreshToken().pipe(
            switchMap((data: any) => {
                storageService.saveTokens(data);
                return next.handle(this.addTokenHeader(req, data.token));
            }),
            catchError(errordata => {
                storageService.logOut();
                return throwError(errordata);

            })
        );
    }


    addTokenHeader(request: HttpRequest<any>, token: any) {
        const TOKEN_HEADER_KEY = 'Authorization';
        return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

}
export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }]

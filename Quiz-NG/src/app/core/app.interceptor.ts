import { Injectable, Provider} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
// TO DO make the interceptor for credentials
@Injectable()
export class AppInterceptor implements HttpInterceptor{
    apiUrl = environment.apiUrl;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('http')){
           req = req.clone({ url: `${this.apiUrl}${req.url}`, withCredentials: true });
        }
        return next.handle(req);
    }
}

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
};
import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
    HttpEventType
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of, ObservableInput } from "rxjs";
import { catchError, filter, finalize, take, switchMap, tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../servicio/login.service';
import { Respuesta } from '../estructuras/respuesta';
import { MensajeService } from '../servicio/Mensaje.service';
import { General } from '../estructuras/General';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private dominio = "locahost";
    private nToken = "";

    private AUTH_HEADER = "authorization";
    private token = "";
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(
        private router: Router,
        private loginService: LoginService,
        private mensajeService: MensajeService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.includes(environment.auth)) {
            return next.handle(req);
        }
        /*if (!req.headers.has("Content-Type")) {
            req = req.clone({
                headers: req.headers.set("Content-Type", "application/json")
            });
        }*/

        if (!req.url.includes('catalogo')) {
            General.loading();
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req)
            .pipe(
                tap(evt => {
                    if (evt instanceof HttpResponse) {
                        General.closeLoading();
                        if(evt.body.token){ 
                            this.token = evt.body.token;
                            evt.body.token = '';
                            sessionStorage.setItem('token', this.token);
                        }else{
                            console.log(evt);
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    General.closeLoading();
                    if (error.status == 401) {
                        this.mensajeService.alertEpico('Sesion caducada', 'Su sesión ha caducado');
                        this.loginService.logout();
                        //this.router.navigate([environment.login]);
                    } else {
                        this.mensajeService.alertError('Error', 'Ha ocurrido un error inesperado, Consulte con el Administrador de sistemas');
                    }
                    return throwError(error);
                }),
                finalize(() => {
                    /*console.log(req);
                    console.log(this.token);*/
                })
            );
    }

    private refreshAccessToken(): Observable<any> {
        return of("secret token");
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        this.token = sessionStorage.getItem('token');
        if (!this.token) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        /*if (!request.url.match(/localhost\//)) {
            return request;
        }*/
        let nRequest = request.clone({
            headers: request.headers.set(this.AUTH_HEADER, this.token)
        });
        return nRequest;
    }

}
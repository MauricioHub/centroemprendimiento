import { Injectable } from '@angular/core';
import { Respuesta } from '../estructuras/respuesta';
import { Usuario } from '../estructuras/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  login(usuario: Usuario) {
    const body = new HttpParams()
      .set('usuario', usuario.usuario)
      .set('password', usuario.password);
    return this.http.post<Respuesta>(environment.base_api_url + 'login/', body.toString(), this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation);
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate([environment.login]);
  }

}

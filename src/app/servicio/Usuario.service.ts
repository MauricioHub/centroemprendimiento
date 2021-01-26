import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Respuesta } from '../estructuras/respuesta';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { General } from '../estructuras/General';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  actualizarFotoPerfil(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', environment.base_api_url + 'perfil/grabarFotoPerfil', formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  getPerfil() {
    let body = new HttpParams();
    return this.http.post<Respuesta>(environment.base_api_url + 'perfil/emprendedor', body.toString(), 
      this.httpOptions);
  }

  insertUser(user) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(user));
    return this.http.post<Respuesta>(environment.base_api_url + 'v1/usuario/insertar', body.toString(), 
      this.httpOptions);
  }

  sendUserMail(body: HttpParams) {
    return this.http.post<Respuesta>(environment.base_api_url + 'mail/send', body.toString(), 
      this.httpOptions);
  }

  /*private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation);
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }*/

}

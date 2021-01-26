import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Persona } from '../estructuras/persona';
import { Respuesta } from '../estructuras/respuesta';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  insertarWithForm(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', environment.base_api_url + 'persona/insertar', formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  actualizarWithForm(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', environment.base_api_url + 'persona/actualizar', formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  insertar(persona: Persona) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(persona));
    return this.http.post<Respuesta>(environment.base_api_url + 'persona/insertar', body.toString(), this.httpOptions);
  }

  actualizar(persona: Persona) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(persona));
    return this.http.post<Respuesta>(environment.base_api_url + 'persona/actualizar', body.toString(), this.httpOptions);
  }

  getPersonasxActividad(id_actividad: number, tipo:string) {
    const body = new HttpParams()
      .set('id_actividad', id_actividad.toString())
      .set('tipo', tipo);
    return this.http.post<Respuesta>(environment.base_api_url + 'persona/getPersonasxActividad', body.toString(), this.httpOptions);
  }

  getPersona(id_persona: number) {
    const body = new HttpParams()
      .set('id_persona', id_persona.toString());
      console.log(id_persona);
    return this.http.post<Respuesta>(environment.base_api_url + 'persona/getPersona', body.toString(), this.httpOptions);
  }

  getPersonas() {
    const body = new HttpParams();
    return this.http.post<Respuesta>(environment.base_api_url + 'persona/getPersonas', body.toString(), this.httpOptions);
  }

  getPersonaXIdentificacion(identificacion: string) {
    const body = new HttpParams()
    .set('cedula', identificacion.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'persona/getPersonaXIdent', body.toString(), this.httpOptions);
  }

  grabarPersona(persona) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(persona));
    return this.http.post<Respuesta>(environment.base_api_url + 'persona/insertar', body.toString(), this.httpOptions);
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

}
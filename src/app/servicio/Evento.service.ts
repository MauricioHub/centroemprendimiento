import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../estructuras/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  
  getEventos(param?: parametrosEventos) {
    param = param ? param : {};
    param.estado = param.estado ? param.estado : 'T';
    param.fecha_desde = param.fecha_desde ? param.fecha_desde : '';
    param.id_tipo_evento = param.id_tipo_evento ? param.id_tipo_evento : '';
    param.codigo = param.codigo ? param.codigo : '';
    param.id_etapa = param.id_etapa ? param.id_etapa : '';
    param.id_persona = param.id_persona ? param.id_persona : '';
    const body = new HttpParams()
      .set('estado', param.estado)
      .set('fecha_desde', param.fecha_desde)
      .set('id_tipo_evento', param.id_tipo_evento)
      .set('codigo', param.codigo)
      .set('id_etapa', param.id_etapa)
      .set('id_persona', param.id_persona);
    return this.http.post<Respuesta>(environment.base_api_url + 'evento/todos', body.toString(), this.httpOptions);
  }

  getEventosU(param?: parametrosEventos) {
    param = param ? param : {};
    param.estado = param.estado ? param.estado : 'T';
    param.fecha_desde = param.fecha_desde ? param.fecha_desde : '';
    param.id_tipo_evento = param.id_tipo_evento ? param.id_tipo_evento : '';
    param.codigo = param.codigo ? param.codigo : '';
    param.id_etapa = param.id_etapa ? param.id_etapa : '';
    param.id_persona = param.id_persona ? param.id_persona : '';
    const body = new HttpParams()
      .set('estado', param.estado)
      .set('fecha_desde', param.fecha_desde)
      .set('id_tipo_evento', param.id_tipo_evento)
      .set('codigo', param.codigo)
      .set('id_etapa', param.id_etapa)
      .set('id_persona', param.id_persona);
    return this.http.post<Respuesta>(environment.base_api_url + 'evento/unicos', body.toString(), this.httpOptions);
  }

  grabarEvento(evento) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(evento));
    return this.http.post<Respuesta>(environment.base_api_url + 'evento/grabar', body.toString(), this.httpOptions);
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

export interface parametrosEventos{
  estado?:string;
  codigo?:string;
  fecha_desde?:string;
  id_tipo_evento?;
  id_etapa?;
  id_persona?;
}

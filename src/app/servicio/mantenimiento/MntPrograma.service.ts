import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Respuesta } from 'src/app/estructuras/respuesta';
import { environment } from 'src/environments/environment';
import { Actividad_etapa } from 'src/app/estructuras/actividad_etapa';

@Injectable({
  providedIn: 'root'
})
export class MntProgramaService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  getActividades(id_etapa, estado?) {
    estado = estado ? estado : 'T';
    const body = new HttpParams()
    .set('estado',estado)
    .set('id_etapa',id_etapa);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/getActividades', body.toString(), this.httpOptions);
  }

  getEtapas(id_sub_programa, estado?) {
    estado = estado ? estado : 'T';
    const body = new HttpParams()
    .set('estado',estado)
    .set('id_sub_programa',id_sub_programa);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/getEtapas', body.toString(), this.httpOptions);
  }

  grabarActividadEtapa(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', environment.base_api_url + 'mantenimiento/grabarActividadEtapa', formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  grabarMultiplesActividades(actividades:Actividad_etapa[]) {
    const body = new HttpParams()
    .set('datos',JSON.stringify(actividades));
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/grabarActividadesEtapa', body.toString(), this.httpOptions);
  }

  grabarEtapa(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', environment.base_api_url + 'mantenimiento/grabarEtapa', formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  getMensajeEstadoActividadEtapa(id_actividad_etapa) {
    const body = new HttpParams()
    .set('id_actividad_etapa',id_actividad_etapa);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/getMensajeEstadoActividadEtapa', body.toString(), this.httpOptions);
  }
}

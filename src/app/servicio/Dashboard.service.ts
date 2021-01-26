import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Respuesta } from '../estructuras/respuesta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  getDashboardAdmin() {
    const body = new HttpParams();
    return this.http.post<Respuesta>(environment.base_api_url + 'dashboard/getDashboardAdmin', body.toString(), this.httpOptions);
  }

  getDatosPivot() {
    const body = new HttpParams();
    return this.http.post<Respuesta>(environment.base_api_url + 'dashboard/getDatosPivot', body.toString(), this.httpOptions);
  }

  getIndicadoresXEtapa(id_etapa) {
    const body = new HttpParams().set('id_etapa',id_etapa);
    return this.http.post<Respuesta>(environment.base_api_url + 'dashboard/indicadoresXEtapa', body.toString(), this.httpOptions);
  }
}

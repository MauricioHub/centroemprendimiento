import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../estructuras/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  getRedesSociales(id_emprendimiento: number) {
    const body = new HttpParams()
      .set('id_emprendimiento', id_emprendimiento.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendimiento/getRedesSociales', body.toString(), this.httpOptions);
  }

  getLugarComercializacion(id_emprendimiento: number) {
    const body = new HttpParams()
      .set('id_emprendimiento', id_emprendimiento.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendimiento/getLugarComercializacion', body.toString(), this.httpOptions);
  }

  getCanalesVentas(id_emprendimiento: number) {
    const body = new HttpParams()
      .set('id_emprendimiento', id_emprendimiento.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendimiento/getCanalesVentas', body.toString(), this.httpOptions);
  }

  getEmpresaDelivery(id_emprendimiento: number) {
    const body = new HttpParams()
      .set('id_emprendimiento', id_emprendimiento.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendimiento/getEmpresaDelivery', body.toString(), this.httpOptions);
  }

  getTipoFinancimiento(id_emprendimiento: number) {
    const body = new HttpParams()
      .set('id_emprendimiento', id_emprendimiento.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendimiento/getTipoFinancimiento', body.toString(), this.httpOptions);
  }

  getActividadesComplementarias(id_emprendimiento: number) {
    const body = new HttpParams()
      .set('id_emprendimiento', id_emprendimiento.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendimiento/getActividadesComplementarias', body.toString(), this.httpOptions);
  }

  getEmprendimiento(id_emprendimiento: number) {
    const body = new HttpParams()
      .set('id_emprendimiento', id_emprendimiento.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendimiento/getEmprendimiento', body.toString(), this.httpOptions);
  }

  insertarPorPasos(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', environment.base_api_url + 'emprendimiento/insertarPorPasos', formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }
}

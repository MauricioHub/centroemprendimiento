import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Respuesta } from '../estructuras/respuesta';
import { environment } from 'src/environments/environment';
import { Evaluacion } from '../estructuras/Evaluacion';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  
  getRubricaEvaluacion(id_evaluacion: number) {
    const body = new HttpParams()
      .set('id_evaluacion', id_evaluacion.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'evaluacion/getEvaluacion', body.toString(), this.httpOptions);
  }

  grabarEvaluacion(evaluacion: Evaluacion) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(evaluacion));
    return this.http.post<Respuesta>(environment.base_api_url + 'evaluacion/grabarEvaluacion', body.toString(), this.httpOptions);
  }
}

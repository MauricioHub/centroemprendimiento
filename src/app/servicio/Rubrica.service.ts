import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../estructuras/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RubricaService {


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  
  getRubricaEvaluacion(id_rubrica: number) {
    const body = new HttpParams()
      .set('id_rubrica', id_rubrica.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'rubrica/rubricaEvaluacion', body.toString(), this.httpOptions);
    
  }

  getMensaje(id_rubrica: number, calificacion) {
    const body = new HttpParams()
      .set('id_rubrica', id_rubrica.toString())
      .set('calificacion', calificacion);
    return this.http.post<Respuesta>(environment.base_api_url + 'rubrica/getMensaje', body.toString(), this.httpOptions);
    
  }
}

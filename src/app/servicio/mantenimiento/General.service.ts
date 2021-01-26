import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Respuesta } from 'src/app/estructuras/respuesta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  getListaTabla(tabla, estado, nombre) {
    const body = new HttpParams()
    .set('estado',estado)
    .set('nombre', nombre)
    .set('tb', tabla);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/consultarDatos', body.toString(), this.httpOptions);
  }

  grabar(tabla, data, campos?:Array<string>) {
    let body = new HttpParams()
    .set('datos',JSON.stringify(data))
    .set('tb', tabla);
    if(campos){
      body = body.set('campos',JSON.stringify(campos));
    }
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/grabarDatos', body.toString(), this.httpOptions);
  }

}

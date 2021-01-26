import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Emprendedor } from '../estructuras/emprendedor';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../estructuras/respuesta';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmprendedorInter } from '../interfaces/Emprendedor';
import { Archivos } from '../interfaces/archivos';
import { General } from '../estructuras/General';

@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {

  constructor(private http: HttpClient) { }

  private emprendedorUrl = environment.base_api_url + 'v1/emprendedores/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  insertar(emprendedor: Emprendedor) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(emprendedor));
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendedor/insertar', body.toString(), this.httpOptions);
  }

  actualizar(emprendedor: Emprendedor) {
    const body = new HttpParams()
      .set('datos', JSON.stringify(emprendedor));
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendedor/actualizar', body.toString(), this.httpOptions);
  }

  getEmprendedor(id_emprendedor: number) {
    const body = new HttpParams()
      .set('id_emprendedor', id_emprendedor.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendedor/getEmprendedor', body.toString(), this.httpOptions);
  }

  getEmprendedorXidPersona(id_persona: number) {
    const body = new HttpParams()
      .set('id_persona', id_persona.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendedor/getEmprendedorXidPersona', body.toString(), this.httpOptions);
  }

  /*getEmprendedores(): Observable<EmprendedorInter[]> {
    return this.http.get<EmprendedorInter[]>(this.emprendedorUrl)
      .pipe(
        catchError(this.handleError<EmprendedorInter[]>('getEmprendedores', []))
      );
  }*/

  getEmprendedores(param?): Observable<Respuesta> {
    const body = new HttpParams()
      .set('parametros', JSON.stringify(param));
    return this.http.post<Respuesta>(environment.base_api_url + 'emprendedor/getEmprendedores', body.toString(), this.httpOptions)
    .pipe(
      catchError(this.handleError<Respuesta>('getEmprendedores', General.respuesta))
    );
  }

  getEmprendedorAT(idEmprendedor: number): Observable<EmprendedorInter[]> {
    return this.http.get<EmprendedorInter[]>(this.emprendedorUrl + idEmprendedor)
      .pipe(
        catchError(this.handleError<EmprendedorInter[]>('getEmprendedores', []))
      );
  }

  getArchivos(idPersona: number, daemon: string): Observable<Archivos[]> {
    return this.http.get<Archivos[]>(this.emprendedorUrl + idPersona.toString() + '/' + daemon)
      .pipe(
        catchError(this.handleError<Archivos[]>('getArchivos', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

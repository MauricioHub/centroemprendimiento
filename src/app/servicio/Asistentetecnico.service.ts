import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AsistenteTecnico } from '../interfaces/asistentetecnico';
import { HorarioAt } from '../interfaces/horarioat';
import { Agenda } from '../interfaces/agenda';
import { Reunion } from '../interfaces/reunion';
import { Edicion } from '../interfaces/edicion';
import { environment } from '../../environments/environment';

import { HttpRequest } from '@angular/common/http';
import { Respuesta } from '../estructuras/respuesta';


@Injectable({
  providedIn: 'root'
})
export class AsistentetecnicoService {

  private asistenteTecnicoUrl = environment.base_api_url + 'v1/asistentetecnico/';
  private asistenteTecnicoHorarioUrl = environment.base_api_url + 'v1/asistentetecnico/horario/';
  private asistenteTecnicoAgendaUrl = environment.base_api_url + 'v1/asistentetecnico/agenda/';
  private asistenteTecnicoIniciarReunionUrl = environment.base_api_url + 'v1/asistentetecnico/agenda/iniciar';
  private asistenteTecnicoActualizarActividadUrl = environment.base_api_url + 'programa/actualizarActividad';
  private asistenteTecnicoFinalizarReunionUrl = environment.base_api_url + 'v1/asistentetecnico/agenda/finalizar';
  private asistenteTecnicoGuardarArchivoUrl = environment.base_api_url + 'perfil/grabarArchivoReunion';
  private asistenteTecnicoSendHDeskEmailUrl = environment.base_api_url + 'mail/sendHDesk';

  private edicionesUrl = environment.base_api_url + 'v1/edicion/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getEdiciones(): Observable<Edicion[]> {
    return this.http.get<Edicion[]>(this.edicionesUrl)
      .pipe(
        catchError(this.handleError<Edicion[]>('getEdiciones', []))
      );
  }


  getAsistentesTecnicos(): Observable<AsistenteTecnico[]> {
    return this.http.get<AsistenteTecnico[]>(this.asistenteTecnicoUrl)
      .pipe(
        catchError(this.handleError<AsistenteTecnico[]>('getAsistentesTecnicos', []))
      );
  }

  addAsistenteTecnico(newAsistenteTecnico: AsistenteTecnico): Observable<AsistenteTecnico> {
    return this.http.post<AsistenteTecnico>(this.asistenteTecnicoUrl, newAsistenteTecnico, this.httpOptions).pipe(
      catchError(this.handleError<AsistenteTecnico>('addAsistenteTecnico'))
    );
  }


  getHorarioAT(idAsistenciaTenica: number): Observable<HorarioAt[]> {
    return this.http.get<HorarioAt[]>(this.asistenteTecnicoHorarioUrl + idAsistenciaTenica.toString())
      .pipe(
        catchError(this.handleError<HorarioAt[]>('getHorarioAT', []))
      );
  }

  addHorario(horarioAt: HorarioAt[]): Observable<HorarioAt> {
    return this.http.post<HorarioAt>(this.asistenteTecnicoHorarioUrl, horarioAt, this.httpOptions).pipe(
      catchError(this.handleError<HorarioAt>('addHorario'))
    );
  }

  getAgendaAT(idPersona: number): Observable<Agenda[]> {
     return this.http.get<Agenda[]>(this.asistenteTecnicoAgendaUrl + idPersona.toString())
      .pipe(
        catchError(this.handleError<Agenda[]>('getAgendaAT', []))
      );
  }

  getMeetingConfigs() {
    var httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const body = new HttpParams()
    return this.http.post<Respuesta>(environment.base_api_url + 'v1/asistentetecnico/agenda/configs', body.toString(), httpOption);
  }

  getMeetingByAgenda(id_agenda: number) {
    var httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const body = new HttpParams()
      .set('id_agenda', id_agenda.toString());
    return this.http.post<Respuesta>(environment.base_api_url + 'v1/asistentetecnico/agenda/reunion', body.toString(), httpOption);
  }

  sendHDeskMail(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', this.asistenteTecnicoSendHDeskEmailUrl , formData, httpOptions);
    return this.http.request<Respuesta>(req); 
  }

  iniciarReunion(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', this.asistenteTecnicoIniciarReunionUrl, formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  getTicketListByPerfil() {
    const body = new HttpParams();
    return this.http.post<Respuesta>(environment.base_api_url + 'ticket/ticketxperfil', body.toString(), this.httpOptions);
  }

  actualizarActividad(reunion: Reunion) {
    var httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const body = new HttpParams()
    .set('id_actividad_inscripcion', reunion.id_actividad_inscripcion)
    .set('estado', reunion.estado);

    console.log('SOYACTUALIZARACTIVIDAD:');
    console.log(body.toString);

    return this.http.post<Respuesta>(this.asistenteTecnicoActualizarActividadUrl, body.toString(), httpOption);
  }

  guardarArchivoReunion(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', this.asistenteTecnicoGuardarArchivoUrl, formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  finalizarReunion(formData: FormData) {
    let httpOptions = {
      reportProgress: true
    };
    let req = new HttpRequest('POST', this.asistenteTecnicoFinalizarReunionUrl, formData, httpOptions);
    return this.http.request<Respuesta>(req);
  }

  downloadFile(urlFile: string): any {
		return this.http.get(urlFile, {responseType: 'blob'});
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

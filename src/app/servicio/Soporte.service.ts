import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Respuesta } from '../estructuras/respuesta';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MensajeService } from './Mensaje.service';
import { Inscripcion, Actividad_inscripcion } from '../estructuras/inscripcion';

@Injectable({
    providedIn: 'root'
  })

export class SoporteService {
  
    formData: FormData;
    constructor(private http: HttpClient) { }
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    getUserProfiles() {
      const body = new HttpParams();
      return this.http.post<Respuesta>(environment.base_api_url + 'ticket/perfil', body.toString(), this.httpOptions);
    }

    getTicketByTypes() {
      const body = new HttpParams();
      return this.http.post<Respuesta>(environment.base_api_url + 'ticket/tipo', body.toString(), this.httpOptions);
    }

    getTicketStatus(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/estado', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }
  
    getTicketCatalogs(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/categoria', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    getTicketSubcatalogs(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/subcategoria', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    getTicketList() {
      const body = new HttpParams();
      return this.http.post<Respuesta>(environment.base_api_url + 'ticket/ticketxusuario', body.toString(), this.httpOptions);
    }

    getTicketListByPerfil() {
      const body = new HttpParams();
      return this.http.post<Respuesta>(environment.base_api_url + 'ticket/ticketxperfil', body.toString(), this.httpOptions);
    }

    getTicketListByParam(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/ticketxparam', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    getCreatedTicketListByParam(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/createdticketxparam', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    getTicketListByParamHistorical(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/xparamHistorical', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    insertWithForm(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/insertar', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    updateAttendedWithForm(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/actualizarTicketAtendido', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    doneAttendedWithForm(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/finalizarTicketAtendido', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    refuseAttendedWithForm(formData: FormData) {
      let httpOptions = {
        reportProgress: true
      };
      let req = new HttpRequest('POST', environment.base_api_url + 'ticket/eliminarTicketAtendido', formData, httpOptions);
      return this.http.request<Respuesta>(req);
    }

    /*
    getProgramaInscrito(id_sub_programa, fase) {
      const body = new HttpParams().set('id_sub_programa', id_sub_programa).set('fase',fase);
      return this.http.post<Respuesta>(environment.base_api_url + 'programa/getProgramaInscrito', body.toString(), this.httpOptions);
    }
    */
}   
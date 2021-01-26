import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Respuesta } from '../estructuras/respuesta';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Emprendedor } from '../estructuras/emprendedor';
import { environment } from 'src/environments/environment';
import { Catalogo } from '../interfaces/catalogo';
import { EventoService, parametrosEventos } from './Evento.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  constructor(private http: HttpClient, 
    private eventoService: EventoService) { }

  getListaCiudad(pais?: string) {
    pais = pais ? pais : 'EC';
    return this.post('catalogo/listaCiudad', { pais: pais });
  }

  getListaGenero(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaGenero', { estado: estado });
  }

  getListaSituacionLaboral(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaSituacionLaboral', { estado: estado });
  }

  getListaTiposEmprendimiento(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaTipoEmprendimiento', { estado: estado });
  }

  getListaEtapasEmprendimientos(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaEtapaEmprendimiento', { estado: estado });
  }

  getListaNivelAcademico(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaNivelAcademico', { estado: estado });
  }

  getListaRedSocial(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaRedesSociales', { estado: estado });
  }

  getListaLugarComercializacion(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaLugarComercializacion', { estado: estado });
  }

  getListaCanalVentas(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaCanalVentas', { estado: estado });
  }

  getListaEmpresaDelivery(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaEmpresaDelivery', { estado: estado });
  }

  getListaActividadesComplementarias(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaActividadesComplentarias', { estado: estado });
  }

  getListaPersonaSocietaria(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaPersonaSocietaria', { estado: estado });
  }

  getListaInteresCentroEmprendimiento(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaInteresCentroEmprendimiento', { estado: estado });
  }

  getListaRazonesNoEmpreder(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaRazonesNoEmprender', { estado: estado });
  }

  getListaEjesMentoria(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaEjesMentoria', { estado: estado });
  }

  getListaEtiquetas(tipo, estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaEtiquetas', { estado: estado, tipo: tipo });
  }

  getListaTipoActividad(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaTipoActividad', { estado: estado });
  }

  getListaTipoEjecucion(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaTipoEjecucion', { estado: estado });
  }

  getListaPrograma(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaPrograma', { estado: estado });
  }

  getListaSubPrograma(id_programa, estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaSubPrograma', { estado: estado, id_programa: id_programa });
  }

  getEtapasXSubPrograma(id_sub_programa, estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaEtapasxSubPrograma', { estado: estado, id_sub_programa: id_sub_programa });
  }

  getAplicaciones(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaAplicaciones', { estado: estado });
  }

  getAplicacionesExterna(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaAplicacionExterna', { estado: estado });
  }

  getListaRubricas(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaRubricas', { estado: estado });
  }

  getListaArchivosNemonico() {
    return this.post('catalogo/listaArchivoNemonico');
  }

  getListaActividadesSubPrograma(id_sub_programa) {
    return this.post('catalogo/listaActividadesSubPrograma', { id_sub_programa: id_sub_programa });
  }

  getEventosEpico(fecha_desde?) {
    fecha_desde = fecha_desde ? fecha_desde : '';
    return this.post('catalogo/eventosEpico', {fecha_desde: fecha_desde});
  }

  getListaTipoEvento(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaTipoEvento', { estado: estado });
  }

  getListaMotivoCancelar(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaMotivoCancelar', { estado: estado });
  }

  getEventos(param?: parametrosEventos) {
    return this.eventoService.getEventos(param);
  }

  getEventosU(param?: parametrosEventos) {
    return this.eventoService.getEventosU(param);
  }

  getListaEstadoActividad(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaEstadoActividad', { estado: estado });
  }

  getListaTipoAsistencia(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaTipoAsistencia', { estado: estado });
  }

  getListaFeriados(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaFeriados', { estado: estado });
  }

  getInstitutionLst(estado?: string) {
    estado = estado ? estado : 'A';
    return this.post('catalogo/listaInstitucion', { estado: estado });
  }

  getUbicaciones(estado?: string, id_ubicacion_padre?) {
    estado = estado ? estado : 'A';
    id_ubicacion_padre = id_ubicacion_padre ? id_ubicacion_padre : '';
    return this.post('catalogo/listaUbicaciones', { estado: estado, id_ubicacion_padre: id_ubicacion_padre });
  }

  post(metodo, param?) {
    let body = new HttpParams();
    if (param) {
      for (let prop in param) {
        body = body.set(prop, param[prop]);
      }
    }
    return this.http.post<Respuesta>(environment.base_api_url + metodo, body.toString(), this.httpOptions).pipe(
      tap(data => {
        if (data.data)
          data.data = data.data as Catalogo[]
      }),
      catchError(this.handleError<Respuesta>(metodo, this.respuesta))
    );
  }

  respuesta: Respuesta = {
    codigo: "0",
    mensaje: "Ha ocurrido un error inesperado",
    data: null,
    mensaje_error: "Ha ocurrido un error inesperado",
  };

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

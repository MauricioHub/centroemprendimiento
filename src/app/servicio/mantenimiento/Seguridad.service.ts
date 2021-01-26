import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Respuesta } from 'src/app/estructuras/respuesta';
import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/interfaces/Menu';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  getMenus(estado, nombre) {
    const body = new HttpParams()
    .set('estado',estado)
    .set('nombre', nombre);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/getMenus', body.toString(), this.httpOptions);
  }

  getPerfiles(estado, nombre) {
    const body = new HttpParams()
    .set('estado',estado)
    .set('nombre', nombre);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/getPerfiles', body.toString(), this.httpOptions);
  }

  grabarMenu(menu: Menu) {
    const body = new HttpParams()
    .set('datos',JSON.stringify(menu));
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/grabarMenu', body.toString(), this.httpOptions);
  }

  grabarPerfil(perfil) {
    const body = new HttpParams()
    .set('datos',JSON.stringify(perfil));
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/grabarPerfil', body.toString(), this.httpOptions);
  }

  getManuxPerfil(id_perfil, id_aplicacion) {
    const body = new HttpParams()
    .set('id_perfil',id_perfil)
    .set('id_aplicacion',id_aplicacion);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/getMenuPerfilSelected', body.toString(), this.httpOptions);
  }

  grabarAsignacionMenus(menus, id_perfil, id_aplicacion) {
    const body = new HttpParams()
    .set('datos',JSON.stringify(menus))
    .set('id_perfil',id_perfil)
    .set('id_aplicacion',id_aplicacion);
    return this.http.post<Respuesta>(environment.base_api_url + 'mantenimiento/asignarMenuPerfil', body.toString(), this.httpOptions);
  }

}

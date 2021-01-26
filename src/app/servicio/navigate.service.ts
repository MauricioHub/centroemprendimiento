import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NavigationItem } from '../theme/layout/admin/navigation/navigation';
import { MENUS } from '../data/menus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../estructuras/respuesta';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  menus:Respuesta;

  getMenu(): Observable<any>{
    return of(MENUS);
  }

  menu(data):void{
    if(data.codigo == '1'){
      data.data.forEach(element => {
        element.title = element.menu;
        element.type = 'group';
        element.icon = element.icono;
        element.children = element.menus;
        if(element.children.length >0){
          this.menuChildren(element.children);
        }else{
          element.type = 'item';
          element.classes = 'nav-item';
        }
      });
      this.menus = data;
    }
  }

  menuChildren(children){
    children.forEach(element => {
      element.title = element.menu;
      element.children = element.menus;
      element.icon = element.icono;
      if(element.children.length >0){
        element.type = 'collapse';
        this.menuChildren(element.children);
      }else{
        element.type = 'item';
        element.classes = 'nav-item';
      }
    });
  }

  getMenuS():Observable<any>{
    //return of(MENUS);
    if(this.menus){
      if(this.menus.data.length>0){
        return of(this.menus);
      }
    }
    return this.http.post<Respuesta>(environment.base_api_url + 'perfil/menu', {}, this.httpOptions).pipe(
      tap(data =>{
        this.menu(data);
      })
    );
  }
}

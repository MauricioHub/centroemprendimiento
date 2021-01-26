import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/estructuras/usuario';
import { LoginService } from 'src/app/servicio/login.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  usuario: Usuario=Usuario.getUser();

  constructor(private router: Router, private loginService: LoginService) { 
    this.validarPerfil();
  }

  ngOnInit() { }

  logout(){
    this.loginService.logout();
  }

  clase = "";

  validarPerfil(){
    let usuario = Usuario.getUser();
    if(usuario.emprendedor == 1){
      this.clase = 'blue';
    }
    if(usuario.asistencia_tecnica == 1){
      this.clase = 'blue';
    }
    if(usuario.mentor == 1) {
      this.clase = 'blue';
    }
    if(usuario.administrador == 1) {
      this.clase = '';
    }
    if(usuario.mesa_servicio == 1) {
      this.clase = '';
    }

  }
}

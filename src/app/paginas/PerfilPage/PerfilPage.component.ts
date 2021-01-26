import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/estructuras/usuario';
import { UsuarioService } from 'src/app/servicio/Usuario.service';
import { Persona } from 'src/app/estructuras/persona';
import { Emprendedor } from 'src/app/estructuras/emprendedor';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';

@Component({
  selector: 'app-PerfilPage',
  templateUrl: './PerfilPage.component.html',
  styleUrls: ['./PerfilPage.component.css']
})
export class PerfilPageComponent implements OnInit {

  usuario: Usuario= Usuario.getUser();
  persona: Persona;
  mentor;
  asistente_tecnico;
  mesa_servicio;
  administrador;
  emprendedor: Emprendedor;
  emprendimiento:Emprendimiento;
  listaEmprendimientos: Emprendimiento[];


  isEmprendedor;
  isMentor;
  isAsistente;
  isMesa_servicio;
  isAdministrador;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getPerfil().subscribe(data => {
      if(data.data){
        this.persona = data.data.persona as Persona;
        this.emprendedor = data.data.emprendedor as Emprendedor;
        this.listaEmprendimientos = data.data.listaEmprendimientos as Emprendimiento[];
      }
      this.validarPerfil();
    });
  }

  validarPerfil(){
    let emprendedor = false;
    let mentor = false;
    let asistente = false;
    let mesa_servicio = false;
    let administrador = false;
    if(this.usuario.emprendedor == 1){
      emprendedor = true;
    }
    if(this.usuario.asistencia_tecnica == 1){
      asistente = true;
    }
    if(this.usuario.mentor == 1) {
      mentor = true;
    }
    if(this.usuario.administrador == 1) {
      administrador = true;
    }
    if(this.usuario.mesa_servicio == 1) {
      mesa_servicio = true;
    }
    this.isEmprendedor = emprendedor;
    this.isMentor = mentor;
    this.isAsistente = asistente;
    this.isMesa_servicio = mesa_servicio;
    this.isAdministrador = administrador;
    if(!this.persona){
      this.persona = new Persona(this.usuario);
    }
  }

}

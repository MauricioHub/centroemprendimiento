import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/estructuras/persona';
import { Usuario } from 'src/app/estructuras/usuario';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() persona:Persona;
  @Input() emprendimiento:Emprendimiento;
  @Input() usuario:Usuario;


  constructor() { }

  ngOnInit() {
    if(!this.usuario){
      this.usuario = Usuario.getUser();
    }
  }

  getColor(interes){
    return 'color: ' + interes.color;
  }
}

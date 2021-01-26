import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from 'src/app/interfaces/Mantenimiento';

@Component({
  selector: 'app-estadoActividad',
  templateUrl: './estadoActividad.component.html',
  styleUrls: ['./estadoActividad.component.scss']
})
export class EstadoActividadComponent extends Mantenimiento implements OnInit {

  tabla="estado_actividad";
  campos=["nombre","estado","codigo"];
  camposLista=[{attr:"id", name:"Id"}, {attr:"nombre", name:"Nombre"}, {attr:"codigo", name:"Codigo"}];

  constructor() { 
    super();
  }

  ngOnInit() {
  }

  grabar(etiqueta){
    
  }

  eliminar(etiqueta){
    
  }

}

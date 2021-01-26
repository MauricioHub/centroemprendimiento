import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {

  @Input() actividades:any[];
  @Input() level;
  @Input() textAprobar="Revisar";
  @Input() aprobarPadre:boolean=false;
  @Output() ejecutar_actividad=new EventEmitter<any>();
  isCollapsed=false;

  constructor() { }

  ngOnInit() {
  }

  _ejecutar_actividad(actividad){
    let link = actividad.plan_trabajo;
    if(!actividad.estado_actividad_inscripcion){
      Swal.fire({
        title: "¡Ups! ",
        html: '<div class="row"><div class="col-12">'+
        '<p style="font-size: 20px">Parece que no has realizado alguna tarea, por eso la actividad está <strong>inhabilitada.</strong></p>' +
        '<div class="btn-group" role="group" aria-label="button groups">' +
        '<a class="btn btn-info btn-sm text-whie" href="' + link + '" target="_blank">Ver mi ruta de trabajo</a>' +
        '</div></div></div>',
        showCancelButton: false,
        type: 'info',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok, ¡Lo entendí!'
      }).then((result) => {
        
      });
      return;
    }
    if(actividad.id_tipo_actividad == 13){
      return;
    }
    this.ejecutar_actividad.emit(actividad)
  }

  getIcono(actividad){
    let css = "";
    switch(actividad.estado_actividad_inscripcion){
      case 'AP': css = "icon-check bg-c-green"; break;
      case 'EP': css = "icon-edit-1 bg-c-blue"; break;
      case 'IN': css = "icon-pause-circle bg-c-yellow"; break;
      case 'PE': css = "icon-pause-circle bg-c-yellow"; break;
      default : css = "icon-alert-circle bg-c-gris"; break;
    }
    return css;
  }
}

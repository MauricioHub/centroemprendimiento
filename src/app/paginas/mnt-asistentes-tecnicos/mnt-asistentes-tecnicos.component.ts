import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

import { AsistentetecnicoService } from 'src/app/servicio/Asistentetecnico.service';
import { PersonaService } from 'src/app/servicio/Persona.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { AsistenteTecnico } from 'src/app/interfaces/asistentetecnico';
import { Persona } from 'src/app/estructuras/persona';
import { Agenda } from 'src/app/interfaces/agenda';
import { Edicion } from 'src/app/interfaces/edicion';


@Component({
  selector: 'app-mnt-asistentes-tecnicos',
  templateUrl: './mnt-asistentes-tecnicos.component.html',
  styleUrls: ['./mnt-asistentes-tecnicos.component.scss']
})
export class MntAsistentesTecnicosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  asistentesTecnicos: AsistenteTecnico[] = [];
  asistenteSeleccionado: AsistenteTecnico;
  agendaAT: Agenda[] = [];
  agendaSeleccionada: Agenda;
  ediciones: Edicion[];
  edicionSeleccionada: Edicion;

  nombre =  '';
  apellido = '';
  email = '';
  telefono = '';
  tipoIdentificacion = '';
  identificacion = '';
  edicion = '';
  cero = '';
  startDateStr = '';
  endDateStr = '';
  startDateLng = 0;
  endDateLng = 0;
  flagDates = false;
  startDate;
  endDate;
  persona: Persona; 

  usuario = 1;


  constructor(
    private asistenteTecnicoService: AsistentetecnicoService,
    private mensajeService: MensajeService,
    private personaService: PersonaService,
    private _datePipeService: DatePipe
  ) { }

  ngOnInit() {
    this.persona = new Persona();
    this.getAsistentesTecnicos();
    this.getEdiciones();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  pictNotLoading(event) { event.target.src = 'images/user.png'; }

  getAsistentesTecnicos(): void {
    this.asistenteTecnicoService.getAsistentesTecnicos()
    .subscribe(
      asistentesTecnicos => {
        this.asistentesTecnicos = asistentesTecnicos;
        this.dtTrigger.next();
      }
    );
  }

  onSelectEdicion(edicion: Edicion): void {
    // console.log(this.edicionSeleccionada);
  }

  personBrowse(newValue){
    if(newValue == 0)
      this.cero = '0';
    if(this.cero == '0')
      this.getPersonaXIdentificacion('0' + this.identificacion);
    else
      this.getPersonaXIdentificacion(this.identificacion);
  }


  getPersonaXIdentificacion(identificacion){
    this.personaService.getPersonaXIdentificacion(identificacion)
    .subscribe(data => {
      if (data.codigo == '1') {
        this.persona = data.data.persona;
      } else {
        console.log(data.mensaje);
      }
    });
  }


  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

  jsonDateToString(time){
    let newDate = '' + time.month + '/' + time.day + '/' + time.year;
    return newDate;
  }

  strDateToLong(timeStr){
    let newDate = new Date(timeStr).valueOf();
    return newDate;
  }

  formatDateReport(date) {
    return this._datePipeService.transform(date, 'yyyy-MM-dd');
  }


  startDateBrowse(newStartDate){
    try{
      this.startDate = newStartDate
      this.startDateStr = this.jsonDateToString(this.startDate);
      this.startDateStr = this.formatDateReport(new Date(this.startDateStr));
      this.startDateLng = this.strDateToLong(this.startDateStr);
      if(!this.isEmpty(this.endDate.day)){        
        this.endDateStr = this.jsonDateToString(this.endDate);
        this.endDateStr = this.formatDateReport(new Date(this.endDateStr));
        this.endDateLng = this.strDateToLong(this.endDateStr);
        if(this.startDateLng <= this.endDateLng)
          this.flagDates = true;
        else
         this.mensajeService.alertError(null, 'Rango fechas, inválido.');
      }
    } catch(error){
      console.log(error);
    }      
  }

  endDateBrowse(newEndDate){
    try{
      this.endDate = newEndDate; 
      this.endDateStr = this.jsonDateToString(this.endDate);
      this.endDateStr = this.formatDateReport(new Date(this.endDateStr));
      this.endDateLng = this.strDateToLong(this.endDateStr);
      if(!this.isEmpty(this.startDate.day)){
        this.startDateStr = this.jsonDateToString(this.startDate);
        this.startDateStr = this.formatDateReport(new Date(this.startDateStr));
        this.startDateLng = this.strDateToLong(this.startDateStr);
        if(this.startDateLng <= this.endDateLng)
          this.flagDates = true;
        else
          this.mensajeService.alertError(null, 'Rango fechas, inválido.');
      }
    } catch(error){
      console.log(error);
    }
  }

  nuevoAsistenteTecnico(): void {
    if(this.persona === undefined){
      this.mensajeService.alertError(null, 'Debe ingresar Persona.');
    } else if(this.edicionSeleccionada === undefined){
      this.mensajeService.alertError(null, 'Debe seleccionar Edición.');
    } else if(!this.flagDates){
      this.mensajeService.alertError(null, 'Debe seleccionar ambas Fechas.');    
    } else{
      if(this.isEmpty(this.startDate.day) || this.isEmpty(this.endDate.day)){
        this.mensajeService.alertError(null, 'Debe seleccionar ambas Fechas.');
      } else{
        if(this.persona.id === undefined){
          this.mensajeService.alertError(null, 'Debe ingresar Persona.');
        } else if(this.persona.tipo_identificacion === undefined){
          this.mensajeService.alertError(null, 'Debe seleccionar Tipo Identificación.');
        } else{
          this.asistenteSeleccionado = {
            id_asistente_tecnico: null,
            fecha_registro_asistente_tecnico: null,
            estado_asistente_tecnico: 'A',
            id_edicion: this.edicionSeleccionada.id,
            edicion: this.edicionSeleccionada.nombre,
            fecha_inicio: this.startDateStr,
            fecha_fin: this.endDateStr,
            id_usuario_registro: this.usuario,
            id_usuario_modifica: null,
            fecha_modificacion_asistente_tecnico: null,
            id_persona: this.persona.id,
            nombre: this.persona.nombre,
            apellido: this.persona.apellido,
            fecha_nacimiento: this.persona.fecha_nacimiento,
            id_genero: this.persona.id_genero,
            genero: null,
            id_ciudad: this.persona.id_ciudad,
            ciudad: null,
            email: this.persona.email,
            telefono: this.persona.telefono,
            id_situacion_laboral: null,
            situacion_laboral: null,
            tipo_identificacion: this.persona.tipo_identificacion,
            identificacion: this.persona.identificacion,
            id_nivel_academico: null,
            nivel_academico: null,
            id_usuario: null,
            direccion: null,
            id_ciudad_domicilio: null,
            ciudad_domicilio: null,
            fecha_registro_persona: null,
            fecha_modificacion_persona: null,
            telefono_fijo: null,
            cv: null,
            estado_persona: null,
            uso_datos: null,
          };
          this.addAsistenteTecnico();
        }
      }
    } 
  }

  addAsistenteTecnico(): void {
   this.asistenteTecnicoService.addAsistenteTecnico(this.asistenteSeleccionado)
    .subscribe(result =>{
      const myJson = JSON.stringify(result);
      const myJsonResponse = JSON.parse(myJson)
      if ( myJsonResponse.estado === '200') {
        Swal.fire({
          title: 'Informacion',
          text: 'Transaccion realizada con éxito',
          type: 'success',
          showCloseButton: true,
          showCancelButton: false
        }).then((willDelete) => {
            if (willDelete.dismiss) {
            } else {
              location.reload();
            }
          });
      }  else {
        Swal.fire('Error', myJsonResponse.data, 'error');
      }
    });
  }


  getEdiciones(): void {
    this.asistenteTecnicoService.getEdiciones()
    .subscribe(
      ediciones => {
        this.ediciones = ediciones
      }
    );

  }
}

import { Component, ElementRef, OnInit, Output, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
  
import { DatePipe, formatDate } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { Agenda } from 'src/app/interfaces/agenda';
import { EmprendedorInter } from 'src/app/interfaces/Emprendedor';
import { Archivos } from 'src/app/interfaces/archivos';
import { Reunion } from 'src/app/interfaces/reunion';
import { AsistentetecnicoService } from 'src/app/servicio/Asistentetecnico.service';
import { EmprendedorService } from 'src/app/servicio/Emprendedor.service';
import { Usuario } from 'src/app/estructuras/usuario';
import { ArchivoComponent } from 'src/app/componente/archivo/archivo.component';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { PersonaService } from 'src/app/servicio/Persona.service';
import { HttpResponse } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import { Persona } from 'src/app/estructuras/persona';
import { SoporteService } from 'src/app/servicio/Soporte.service';
import { Ticket } from 'src/app/estructuras/Ticket';
import * as moment from 'moment';
import { Meeting } from 'src/app/estructuras/Meeting';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoTemplateComponent } from './todo-template.component';
import { Globals } from './Globals';
  
@Component({
  selector: 'app-asistente-tecnico-calendario',
  templateUrl: './asistente-tecnico-calendario.component.html',
  styleUrls: ['./asistente-tecnico-calendario.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AsistenteTecnicoCalendarioComponent implements OnInit {
  @ViewChild('todoTemplate', {read: ViewContainerRef}) todoRef;
  @ViewChild('agreementTemplate', {read: ViewContainerRef}) agreementRef;
  @ViewChild('observationTemplate', {read: ViewContainerRef}) observationRef;
  @ViewChild('defaultClick', {static: false}) defaultClick: ElementRef;
  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template 
  @Output() public monthSelected = new EventEmitter<any>();
 
  user = Usuario.getUser();

  agendaAT: Agenda[];
  calendar: FullCalendarComponent; 
  form = new FormGroup({isFase: new FormControl('')}); 
  formRlc = new FormGroup({relocatedFase: new FormControl('')});
  formRcm: FormGroup;
  formSelect: FormGroup;
  faseSelect: FormGroup;
  recoLst: any = [
    { id: 1, name: 'Mentorías' },
    { id: 2, name: 'Capacitación Recreando' },
    { id: 3, name: 'Validación' },
    { id: 4, name: 'Revisión de normativas y permisos' },
    { id: 5, name: 'Relacionamiento con otros agentes (networking)' },
    { id: 6, name: 'Acceso a canales de comercialización (ejemplo: plataformas de comercio electrónico)' },
    { id: 7, name: 'Trabajo en su marca (diseño de la marca y empaque)' },
    { id: 8, name: 'Iniciar proceso de formalización' },
    { id: 9, name: 'Otro:' }
  ];  

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  allDaySlot = false;
  isOtherFase = false;
  selectedFase = '';

  temas = '';
  acuerdos = '';
  observacion = '';
  colorItem = '#3ebfea';

  public notSupported = false;
  public todoListMessage: string;
  public todo_list_message_error: boolean;
  public agreementListMessage: string;
  public agreement_list_message_error: boolean;
  public observationListMessage: string;
  public observation_list_message_error: boolean;
  public newTodoList: any;

  dateObj = new Date();
  yearMonth = this.dateObj.getUTCFullYear() + '-' + (this.dateObj.getUTCMonth() + 1);

  calendarEvents: EventInput[] = []

  configuration = new Meeting();
  configurations: any[];
  emprendedor: EmprendedorInter[];
  archivos: Archivos[];
  reunion: Reunion[] = [];
  persona: Persona;
  agendaSeleccionada: Agenda;
  ticket: Ticket = new Ticket();

  public showView = false;
  public showFR = false;
  public showIR = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private asistenteTecnicoService: AsistentetecnicoService,
    private emprendedorService: EmprendedorService,
    private mensajeService: MensajeService,
    private personaService: PersonaService,
    private soporteService: SoporteService,
    private _datePipeService: DatePipe,
    private formBuilder: FormBuilder,
    private globals: Globals
  ) { 
    this.formRcm = this.formBuilder.group({
      recomend: this.formBuilder.array([], [Validators.required])
    });
    this.newTodoList = '';
    this.form.patchValue({
      isFase: 'correctFase' 
    });

    this.formRlc.patchValue({
      relocatedFase: 'Descubriendo' 
    });
  }

  ngOnInit() {
     const isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIE) {
      this.notSupported = true;
    }
     
    this.getAsistenteTecnicoAgenda(this.user.id_persona);
    this.getMeetingConfigs(); 
  } 

  public pictNotLoading(event) { event.target.src = 'images/user.png'; }

  createTodo(){
    const factory=this.componentFactoryResolver.resolveComponentFactory(TodoTemplateComponent);
    let instance  = this.todoRef.createComponent(factory).instance;
    instance.todoName = this.todoListMessage;
    instance.todoObj = {id:1, name:this.todoListMessage};
    this.todoListMessage = '';
  }
  
  createAgreement(){
    const factory=this.componentFactoryResolver.resolveComponentFactory(TodoTemplateComponent);
    let instance  = this.agreementRef.createComponent(factory).instance;
    instance.todoName = this.agreementListMessage;
    instance.todoObj = {id:2, name:this.agreementListMessage};
    this.agreementListMessage = '';
  }

  createObservation(){
    const factory=this.componentFactoryResolver.resolveComponentFactory(TodoTemplateComponent);
    let instance  = this.observationRef.createComponent(factory).instance;
    instance.todoName = this.observationListMessage;
    instance.todoObj = {id:3, name:this.observationListMessage};
    this.observationListMessage = '';
  }

  changeParamEType(e) {
     switch(e.target.value){
       case 'incorrectFase':
          this.isOtherFase = true;  
          break;
       default:
          break;      
    }
  }

  changeRFaseType(e){ 
    this.selectedFase = e.target.value;
    /*switch(e.target.value){
      case 'discoveringFase':
        this.selectedFase = e.target.value;
        break;
      case 'recreatingFase':
        console.log('SOY recreating.');
        break;    
      case 'validatingFase':
        console.log('SOY validating.');
        break; 
      case 'startingFase':
        console.log('SOY starting.');
        break;         
      case 'withoutRelocate':
        console.log('SOY without relocate.');
        break;
      case 'other':
        console.log('SOY other.');
        break;        
    } */
  }

  onRecomendChange(e){
    const recomend: FormArray = this.formRcm.get('recomend') as FormArray;
  
    if (e.target.checked) {
      recomend.push(new FormControl(e.target.value));
    } else {
       const index = recomend.controls.findIndex(x => x.value === e.target.value);
       recomend.removeAt(index);
    } 
  }

  /*addTodoList() {
    console.log('soy add todoList.');    
    console.log(this.todoListMessage);

    if (this.todoListMessage === '' || this.todoListMessage === undefined) {
      this.todo_list_message_error = true;
    } else {
      const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      console.log(random);
      const html_todo = '<div class="to-do-list mb-3">' +
        '<div class="d-inline-block">' +
        '<label class="check-task custom-control custom-checkbox d-flex justify-content-center">' +
        '<input type="checkbox" class="custom-control-input" id="info_' + random + '" (change)="completeTodoList($event)">' +
        '<span class="custom-control-label">' + this.todoListMessage + '</span>' +
        '</label>' +
        '</div>' +
        '</div>';

      this.newTodoList = this.newTodoList + html_todo;
      this.todoListMessage = '';
      console.log(this.newTodoList);
    }   
  }*/

  /*completeTodoList(e) { 
    e.target.parentElement.classList.remove('done-task');
    if (e.target.checked) {
      e.target.parentElement.classList.add('done-task');
    }
  }*/

  getAsistenteTecnicoAgenda(idPersona: number): void {

    this.asistenteTecnicoService.getAgendaAT(idPersona)
      .subscribe(
        agendaAT => {
          this.agendaAT = agendaAT;
          this.agendaAT.forEach((agenda, index) => {
            if(agenda.id_reunion == null)
              this.colorItem = '#FFBA57';
            else
              (agenda.estado_reunion == 'EP')? this.colorItem = '#4680FF' : this.colorItem = '#9CCC65';
            
            this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
              title: agenda.persona1,
              start: formatDate(agenda.fecha_agenda + ' ' + agenda.hora_inicio_agenda, 'yyyy-MM-dd HH:mm', 'en-US'),
              end: formatDate(agenda.fecha_agenda + ' ' + agenda.hora_inicio_agenda, 'yyyy-MM-dd HH:mm', 'en-US'),
              borderColor: '#3ebfea',
              backgroundColor: this.colorItem,
              textColor: '#fff',
              extendedProps: {
                id_agenda: agenda.id_agenda,
                id_persona: agenda.id_persona,
                indice_agenda: index
              },
            });
          });
        }
      );
  }

  handleDateClick(arg: any) { }

  handleEventClick(arg: any) {
    let externalProperties;
    if (arg.event.extendedProps)
      externalProperties = arg.event.extendedProps;
    else
      externalProperties = arg.event._def.extendedProps;

    this.getMeetingByAgenda(externalProperties.id_agenda);
    this.getPersona(externalProperties.id_persona);
    this.getEmprendedor(externalProperties.id_persona);
    this.getArchivos(externalProperties.id_persona, 'MODELO_NEGOCIO');
    this.agendaSeleccionada = this.agendaAT[externalProperties.indice_agenda];
  }

  showStartAgenda(): boolean {
    if (this.reunion.length == 0)
      return true;
    else
      return false;
  }

  showEndAgenda(): boolean {
    if (this.reunion.length == 0) {
      return false;
    } else {
      if (this.reunion[0].estado != "AP")
        return true;
      else
        return false;
    }
  }

  isFilesEmpty(): boolean {
    if (this.archivos) {
      if (this.archivos.length > 0)
        return true;
      else return false;
    } else
      return false;
  }

  getPersona(idPersona: number): void {
    this.personaService.getPersona(idPersona)
      .subscribe(data => {
        if (data.codigo == '1') {
          this.persona = data.data;
          console.log(this.persona);
        } else {
          console.log(data.mensaje);
        }
      });
  }

  getEmprendedor(idPersona: number): void {
    this.emprendedorService.getEmprendedorAT(idPersona)
      .subscribe(
        emprendedor => {
          this.emprendedor = emprendedor;
          console.log(this.emprendedor);
        }
      );
  }

  getArchivos(idPersona: number, daemon: string): void {
    this.emprendedorService.getArchivos(idPersona, daemon)
      .subscribe(
        archivos => {
          this.archivos = archivos;
          this.showView = true;
          console.log(this.archivos);
        }
      );
  }

  public insertTicket(nameTicket: string) {
    try {
      console.log("SOY INSERT TICKET:" + nameTicket);
      this.ticket.id_ticket = 0;
      this.ticket.id_tipo = 1;
      //this.ticket.id_usuario_creacion = this.persona.id_usuario;
      this.ticket.id_usuario_creacion = 1608;
      //this.ticket.id_persona = this.persona.id;
      this.ticket.id_persona = 1915;
      this.ticket.id_categoria = 10;
      this.ticket.id_reunion = this.reunion[0].id_reunion;
      this.ticket.id_subcategoria = null;
      this.ticket.fecha_creacion = this.getFormattedDate();
      this.ticket.descripcion = nameTicket;
      //this.ticket.descripcion = "Generado por asistencia tecnica.";

      let formData = new FormData();
      formData.append('datos', JSON.stringify(this.ticket));
      console.log('SOY TICKET:');
      console.log(JSON.stringify(this.ticket));

      this.soporteService.insertWithForm(formData).subscribe(data => {
        if (data instanceof HttpResponse) {
          if (data.body.codigo == '0') {
            console.log(data.body.mensaje);
          } else {
            console.log(data.body.mensaje);
            if(this.isOtherFase && nameTicket!= "Generado por asistencia tecnica.")
              this.sendHDeskMail('fase1', this.selectedFase);
          }
        }
      }); 

    } catch (error) {
      console.log(error);
    }
  }

  public sendHDeskMail(fase1, fase2) {
    try{
      console.log("SOY SEND DESK mAIL.");
      var datos = {
        "fase1": fase1,
        "fase2": this.selectedFase
      };
      let formData = new FormData();
      formData.append('datos', JSON.stringify(datos));
      this.asistenteTecnicoService.sendHDeskMail(formData)
      .subscribe(data => { 
        if (data instanceof HttpResponse) {
          if (data.body.codigo == '1') {
            console.log("soy SEND DESK MAIL - EXITO.");
            //this.mensajeService.alertOK(null, data.body.mensaje);
          } else {
            console.log(data.body.mensaje);
          }
        }       
      }); 
    } catch (error) {
      console.log(error);
    } 
  } 

  
  iniciarReunion(): void {   
     var hourStart = this.agendaSeleccionada.hora_inicio_agenda.split(':')[0] + ':'
    + this.agendaSeleccionada.hora_inicio_agenda.split(':')[1];
    //if (this.isMeetingDay(this.agendaSeleccionada.fecha_agenda + " " + hourStart)) {
      const today = new Date();
      const time = today.getHours() + ':' + today.getMinutes()
      const formatedToday = formatDate(today, 'yyyy-MM-dd HH:mm:ss', 'en-US');
      let id_reunion = null;
      if (this.agendaSeleccionada.id_reunion) {
        id_reunion = this.agendaSeleccionada.id_reunion;
      }
      this.reunion.push({
        id_reunion: id_reunion,
        id_agenda: this.agendaSeleccionada.id_agenda,
        hora_inicio_agenda: this.agendaSeleccionada.hora_inicio_agenda.split(":")[0]
          + ":" + this.agendaSeleccionada.hora_inicio_agenda.split(":")[1],
        hora_fin_agendad: this.agendaSeleccionada.hora_fin_agenda.split(":")[0]
          + ":" + this.agendaSeleccionada.hora_fin_agenda.split(":")[1],
        fecha_agendada: this.agendaSeleccionada.fecha_agenda,
        hora_inicio_reunion: time,
        hora_fin_reunion: null,
        temas: null,
        acuerdos: null,
        observacion: null,
        url_archivo_reunion: null,
        estado: "EP",
        tipo_reunion: null,
        url_reunion: null,
        id_actividad_inscripcion: null
      });

      let formData = new FormData();
      formData.append('datos', JSON.stringify(this.reunion[0]));
      console.log(JSON.stringify(this.reunion[0]));
  
      this.asistenteTecnicoService.iniciarReunion(formData).subscribe(data => {
        if (data instanceof HttpResponse) {
          if (data.body.codigo == '0') {
            this.mensajeService.alertError(null, data.body.mensaje);
          } else {
            this.reunion[0] = data.body.data;
            this.temas = this.reunion[0].temas;
            this.acuerdos = this.reunion[0].acuerdos;
            this.observacion = this.reunion[0].observacion;
            if (this.reunion[0].estado != 'AP')
              this.reunion[0].estado = "EP";
            this.showFR = true;
            this.showIR = false;
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSe1WHBsnSel3sJ8bI_PG43fbrNi2efQyDqPzwaXXOcPaHMFSA/viewform?entry.847425255=' + this.reunion[0].id_reunion +
                        '&entry.560905001=' + this.agendaSeleccionada.persona2 +
                        '&entry.930274099=' + this.agendaSeleccionada.persona1 +
                        '&entry.1577321074=' + this.agendaSeleccionada.telefono +
                        '&entry.925111284=' + this.agendaSeleccionada.fecha_agenda +
                        '&entry.547686735=' + this.reunion[0].hora_inicio_reunion +
                        '&entry.1381627069=' + this.reunion[0].hora_fin_reunion, '_blank');
            //this.actualizarActividad(this.reunion[0]);
          }
        }
      });
   // }  else {
     //  this.mensajeService.alertError(null, "Fecha Reunión no corresponde.");
    //} 
  }

  actualizarActividad(reunion: Reunion) {
    this.asistenteTecnicoService.actualizarActividad(reunion)
      .subscribe(data => {
        if (data.codigo == '1') {
          this.mensajeService.alertOK(null, data.mensaje);
        } else {
          this.mensajeService.alertError(null, data.mensaje);
        }
      });
  }

  getTodoContent(){
    var count = 0;
    var todoStr = '';
    for(let o of this.globals.todoLst){
      if(this.globals.todoLst.length == 0){
        todoStr = todoStr + o;
      } else{
          if(count == (this.globals.todoLst.length-1))
            todoStr = todoStr + o;
          else
            todoStr = todoStr + '|' + o;
      }
      count++;  
    }
    return todoStr;
  }

  finalizarReunion(): void{
    console.log('SOY TODO-LIST:');
    console.log(this.globals.todoLst.length);
    this.temas = this.getTodoContent();
    console.log(this.temas);
    /*for(let o of this.globals.todoLst){
      console.log(o);
    }
    
    console.log('SOY AGREEMENT-LIST:');
    console.log(this.globals.agreementsLst.length);
    for(let p of this.globals.agreementsLst){
      console.log(p);
    }

    console.log('SOY OBSERVATION-LIST:');
    console.log(this.globals.observationsLst.length);
    for(let q of this.globals.observationsLst){
      console.log(q);
    }*/

    /*try{
      if(ArchivoComponent.archivo === undefined)
        this.execFinalizarReunion('');
      else
        this.guardarArchivoReunion();  
    } catch(error){
      console.log(error);
    }*/ 
  }

  guardarArchivoReunion(): void {
    let formData = new FormData();

    formData.append('archivoReunion', ArchivoComponent.archivo);
    this.asistenteTecnicoService.guardarArchivoReunion(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        if (data.body.codigo == '0') {
          this.mensajeService.alertError(null, data.body.mensaje);
          Swal.fire('Error', data.body.mensaje, 'error');
        } else {
          this.reunion[0].url_archivo_reunion = data.body.data;
          this.execFinalizarReunion(this.reunion[0].url_archivo_reunion);
        }
      }
    });
  }

  execFinalizarReunion(url_archivo_reunion: string): void {

    const nameTck = "Generado por asistencia tecnica.";
    const faseChdTck = "Solicitud Cambio a Fase:";
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes()
    const formatedToday = formatDate(today, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    if (this.reunion[0]) {
      this.reunion[0].hora_fin_reunion = time;
      this.reunion[0].temas = this.temas;
      this.reunion[0].acuerdos = this.acuerdos;
      this.reunion[0].observacion = this.observacion;
      this.reunion[0].url_archivo_reunion = url_archivo_reunion;
      this.reunion[0].tipo_reunion = "";
      this.reunion[0].url_reunion = "";
      this.reunion[0].estado = "AP";
    }
    
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.reunion[0]));

    this.asistenteTecnicoService.finalizarReunion(formData)
      .subscribe(data => {
        if (data instanceof HttpResponse) {
          if (data.body.codigo == '0') {
            this.mensajeService.alertError(null, data.body.mensaje);
          } else {
            console.log("SOY EXEC FINALIZAR EXITO.");
            this.reunion[0] = data.body.data;
            this.reunion[0].estado = "AP";
            this.showFR = false;
            this.showIR = false;
            if(this.isOtherFase)
              this.insertTicket(faseChdTck + " " + this.selectedFase);  
            this.insertTicket(nameTck);
            //this.actualizarActividad(this.reunion[0]);
          }
        }
      });
  }

  public getFormattedDate(){
    var ddStr:string = '';
    var mmStr:string = '';
    var hrStr:string = '';
    var mnStr:string = '';
    var scStr:string = '';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var mint = today.getMinutes();
    var secd = today.getSeconds();

    (dd<10) ? ddStr = "0" + dd : ddStr = "" + dd;
    (mm<10) ? mmStr = "0" + mm : mmStr = "" + mm;
    (hour<10) ? hrStr = "0" + hour : hrStr = "" + hour;
    (mint<10) ? mnStr = "0" + mint : mnStr = "" + mint;
    (secd<10) ? scStr = "0" + secd : scStr = "" + secd;

    return "" + yyyy + "-" + mmStr + "-" + ddStr + " " + hrStr + ":" + mnStr + ":" + scStr;
  }

  downloadFile(archivo: Archivos) {
    const fileUrl = archivo.url_archivo + archivo.modelo_negocio_archivo;
    this.asistenteTecnicoService.downloadFile(fileUrl)
      .subscribe(response => {
        let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        fileSaver.saveAs(blob, archivo.modelo_negocio_archivo);
      }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  strDateToLong(timeStr){
    let newDate = new Date(timeStr).valueOf();
    return newDate;
  }

  formatDateReport(date) {
    return this._datePipeService.transform(date, 'yyyy-MM-dd');
  }

  formatDateMeeting(date) {
    return this._datePipeService.transform(date, 'yyyy-MM-dd hh:mm');
  }

  isMeetingDay(dateStr: string): boolean{
    var todayStr = this.formatDateMeeting(new Date());
    var today = moment(todayStr);
    var originDate = moment(dateStr);
    if(originDate.diff(today, 'days') == 0){
      if(originDate.diff(today, 'hours') <= parseInt(this.configuration.HORAS_MIN_REUNION_INI)){
        if(originDate.diff(today, 'minutes') <= parseInt(this.configuration.HORAS_MIN_REUNION_INI)*60)
          return true;
        else
          return false;
      } else{return false;}
    } else{
      return false;
    }
  }

  getMeetingConfigs(): void {
    this.asistenteTecnicoService.getMeetingConfigs()
      .subscribe(data => {
        if (data.codigo == '1') {
          this.configurations = data.data;
          for (let entry of this.configurations) {
            switch(entry.nombre){
              case 'HORAS_MIN_AGENDA_CAN':
                this.configuration.HORAS_MIN_AGENDA_CAN = entry.valor;
                break;
              case 'HORAS_MIN_AGENDA_AT':
                this.configuration.HORAS_MIN_AGENDA_AT = entry.valor;
                break;  
              case 'MAX_DIAS_AGENDA_AT':
                this.configuration.MAX_DIAS_AGENDA_AT = entry.valor;
                break;
              case 'HORAS_MIN_REUNION_INI':
                this.configuration.HORAS_MIN_REUNION_INI = entry.valor;
                break;  
              default:
                break;    
            }
          }
        } else {
          console.log(data.mensaje);
        }
      });
  }

  getMeetingByAgenda(idAgenda: number): void {
    this.asistenteTecnicoService.getMeetingByAgenda(idAgenda)
      .subscribe(data => {
        if (data.codigo == '1') {
          this.reunion = data.data;
          if (this.reunion.length == 0) {
            this.showFR = false;
            this.showIR = true;
          } else {
            if (this.reunion[0].estado != "AP") {
              this.showFR = true;
              this.showIR = false;
            } else {
              this.showFR = false;
              this.showIR = false;
            }
          }
        } else {
          console.log(data.mensaje);
        }
      });
  }

}

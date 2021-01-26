import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import listView from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { General } from 'src/app/estructuras/General';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss']
})
export class AgendarComponent implements OnInit, AfterViewInit {

  @ViewChild('Eventcalendar', { static: false }) private eventCalendar: FullCalendarComponent;


  @Input() listaEventos: EventInput[] = [];
  @Input() horarios: any[];
  @Input() maxDay = 0;
  @Input() minHoras = "0";
  @Input() id_persona = 0;
  @Input() id_persona2 = 0;
  @Input() tipo = "ASISTENCIA TECNICA";

  @Output() agenda = new EventEmitter<any>();


  selectConstraint: any;
  eventConstraint: any;

  fechaActual;
  calendarWeekends = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listView];
  editable = true;
  allDaySlot = false;
  selectable = true;
  agregado = false;
  eventDurationEditable = false;
  hiddenDays=[0,6]
  titleFormat = { year: 'numeric', month: 'long', day: 'numeric'};
  eventTimeFormat= {hour: "numeric", minute: "2-digit", meridiem: "short"}

  tiposAsistencia = {};

  listaFeriados=[];

  constructor(private catalogoService: CatalogoService, private mensajeService: MensajeService) {
    
  }

  ngOnInit() {
    moment.locale('es');
    let horas = parseInt(this.minHoras) + 24;
    this.fechaActual = moment().add(horas, 'hours').format('YYYY-MM-DD');

    this.selectConstraint = {
      start: moment().format('YYYY-MM-DD'),
      end: moment().add(this.maxDay, 'days').format('YYYY-MM-DD'),
      rendering: 'background',
      backgroundColor: '#f44236'
    }
    this.eventConstraint = {
      start: moment().format('YYYY-MM-DD'),
      end: moment().add(this.maxDay, 'days').format('YYYY-MM-DD'),
      rendering: 'background',
      backgroundColor: '#f44236'
    }
    this.catalogoService.getListaTipoAsistencia().subscribe(data=>{
      if(data.codigo=="1"){
        this.tiposAsistencia = General.getDataOptionAlert(data.data);
      }
    });
    this.catalogoService.getListaFeriados().subscribe(resp=>{
      if(resp.codigo == '1'){
        resp.data.forEach(item => {
          var evento = {
            groupId: 'noDisponibleID',
            title: 'Feriado: '+item.nombre,
            start: item.fecha + 'T' + '00:00:00',
            end: item.fecha + 'T' + '23:59:59',
            borderColor: '#f44236',
            backgroundColor: '#f44236',
            textColor: '#fff',
            stick: true,
            editable: false,
            overlap: false,
            is_new: false
          };
          this.listaFeriados.push(evento);
        });
      }
    });
  }

  ngAfterViewInit(){
    //$('.fc-widget-content').not('.fc-time').attr('style', 'background-color: lavenderblush !important;');
    $('.fc-widget-content').not('.fc-time').attr('style', 'background-color: lavenderblush !important;');
  }

  ngOnChanges(changes: SimpleChanges) {
    let self = this;
    if(changes.listaEventos && this.listaEventos){
      this.listaFeriados.forEach(evento => {
        self.listaEventos.push(evento);
      });
    }
  }

  select(event) {
    if (event.view.type == "dayGridMonth") {
      $('.fc-timeGridDay-button').click();
      return;
    }
    if (this.agregado) {
      this.mensajeService.alertInfo('La agenda ya se encuentra agregada!', 'Puede cambiar el horario moviendo la agenda. El horario solo lo podrá cambiar antes de finalizar la actividad');
      return;
    }
    var allDay = !event.start.hasTime && !event.end.hasTime;
    var d = moment(event.start).weekday();
    d++;
    if (d == 7)
      d = 0;
    var dia = null;
    this.horarios.forEach(function (hd) {
      if (hd.diaN === d) {
        dia = hd;
      }
    });
    if (!dia) {
      return;
    }
    if (!this.validarEvento(event, this.maxDay, this.minHoras, this.horarios)) {
      return;
    }

    var newEvent: any = {};
    newEvent._id = 'NewEventAgenda';
    newEvent.is_new = true;
    newEvent.title = 'Agendado';
    newEvent.start = moment(event.start).format();
    newEvent.end = moment(event.start).add(1, 'hours').format();
    newEvent.stick = true;
    newEvent.diaN = d;
    newEvent.tipo = this.tipo;
    newEvent.tema = this.tipo;
    newEvent.estado = 'AP';
    newEvent.horarios = this.horarios;
    newEvent.maxDay = this.maxDay;
    newEvent.minHoras = this.minHoras;
    newEvent.validarEvento = this.validarEvento;
    let fechaAg = moment(event.start).format('LL');
    let horaAg = moment(event.start).format('HH:mm');
    Swal.fire({
      title: "Confirmar agenda",
      html: '<div class="row"><div class="col-12">'+
      '<p class="alert alert-primary">Desea agendar su '+this.tipo+' para el '+fechaAg+' a las '+horaAg+'</p>' +
      '<p>Recuerda nuestras políticas de reagendamiento <a href="https://epico.gob.ec/archivos/politicas_reagendamiento.pdf" target="_blank">aquí</a></p>'+
      '</div></div>',
      showCancelButton: true,
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.agregarAgenda(newEvent);
      }
    });
  }

  agregarAgenda(newEvent){
    Swal.fire({
      title: 'Selecciona la modalidad de tu asistencia técnica',
      input: 'radio',
      inputOptions: this.tiposAsistencia,
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputValue: '1',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if(!value){
          Swal.showValidationMessage('Debe seleccionar la modalidad de asistencia');
        }else{
          newEvent.id_tipo_asistencia = value;
        }
      }
    }).then((result) => {
      if (result.value) {
        this.listaEventos = this.listaEventos.concat(newEvent);
        this.agregado = true;
      }
    });
  }

  eventAllow(event, eventApi) {
    return eventApi._def.extendedProps.validarEvento(event, eventApi._def.extendedProps.maxDay, eventApi._def.extendedProps.minHoras, eventApi._def.extendedProps.horarios);
  }

  validarEvento(event, maxDay, minHoras, horarios): boolean {
    let fechaActual = moment();
    // valida que no sea menor a la fecha actual
    if (moment(event.start).isBefore(fechaActual)) {
      return false;
    }

    //valida que no sea menor a las horas configuradas
    fechaActual.add(minHoras, 'hours');
    if (moment(event.start).isBefore(fechaActual)) {
      return false;
    }

    // Valida que no sea mayor a los dias configurados
    fechaActual.add(maxDay, 'days');
    if (moment(event.start).isAfter(fechaActual)) {
      return false;
    }
    let hora_ini = moment(event.start).format('HH:mm:ss');
    let hora_fin = moment(event.end).format('HH:mm:ss');
    let d = moment(event.start).weekday();
    d++;
    if (d == 7)
      d = 0;
    let hora_ini_n = parseInt(hora_ini.substring(0, 2));
    let hora_fin_n = parseInt(hora_fin.substring(0, 2));
    var hmin = '00:00:00';
    var hmax = '00:00:00';
    if (!horarios) {
      return true;
    }
    let valido = false;
    horarios.forEach(function (hd) {
      if(!hd.horas){
        return;
      }
      if (hd.diaN === d) {
        hd.horas.forEach(element => {
          if(!valido){
            hmin = element.hora_inicio;
            hmax = element.hora_fin;
            let hmin_n = parseInt(hmin.substring(0, 2));
            let hmax_n = parseInt(hmax.substring(0, 2));
            valido = !(hora_ini_n < hmin_n || hora_fin_n > hmax_n);
          }
        });
      }
    });
    return valido;
  }

  eventRender(eventApi) {
    $(eventApi.el).find('.fc-content').attr('style', 'margin-top: -5px !important;');
    if (eventApi.event._def.extendedProps) {
      if (eventApi.event._def.extendedProps._id == 'NewEventAgenda') {
        this.agenda.emit(eventApi.event);
      }
    }
  }

}

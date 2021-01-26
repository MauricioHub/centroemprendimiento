import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { formatDate } from '@angular/common';
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
import { AsistenteTecnico } from 'src/app/interfaces/asistentetecnico';
import { AsistentetecnicoService } from 'src/app/servicio/Asistentetecnico.service';
import { EmprendedorService } from 'src/app/servicio/Emprendedor.service';

@Component({
  selector: 'app-mesa-consulta-calendario',
  templateUrl: './mesa-consulta-calendario.component.html',
  styleUrls: ['./mesa-consulta-calendario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MesaConsultaCalendarioComponent implements OnInit {
   @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  agendaAT: Agenda[];
  calendar: FullCalendarComponent;
  // Estas variables son de "sesion" deben cambiar una vez que integremos el login
  idPersona = 1759;

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  allDaySlot = false;

  temas = '';
  acuerdos = '';
  observacion = '';

  public notSupported = false;

  calendarEvents: EventInput[] = []

  emprendedor: EmprendedorInter[];
  archivos: Archivos[];
  reunion: Reunion[] = [];

  agendaSeleccionada: Agenda;

  asistentesTecnicos: AsistenteTecnico[] = [];
  asistenteSeleccionado: AsistenteTecnico;

  public showView = false;
  public showFR = false;
  public showIR = true;

  constructor(
      private asistenteTecnicoService: AsistentetecnicoService,
      private emprendedorService: EmprendedorService
  ) { }

  ngOnInit() {
    const isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIE) {
      this.notSupported = true;
    }
    this.getAsistentesTecnicos();
  }

  getAsistentesTecnicos(): void {
    this.asistenteTecnicoService.getAsistentesTecnicos()
    .subscribe(
      asistentesTecnicos => {
        this.asistentesTecnicos = asistentesTecnicos
      }
    );
  }

  onSelectAsistente(asistente: AsistenteTecnico): void {
    this.getAsistenteTecnicoAgenda(this.asistenteSeleccionado.id_persona);
  }

  getAsistenteTecnicoAgenda(idPersona: number): void {
    this.asistenteTecnicoService.getAgendaAT(idPersona)
    .subscribe(
      agendaAT => {
        this.agendaAT = agendaAT;
        if(this.agendaAT.length < 1) {
            this.calendarEvents = [];
        } else {
            this.agendaAT.forEach((agenda,index) => {
            // console.log(formatDate(agenda.fecha_agenda + ' ' + agenda.hora_inicio_agenda, 'yyyy-MM-dd HH:mm', 'en-ES'));
              this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
                title: agenda.persona1,
                start: formatDate(agenda.fecha_agenda + ' ' + agenda.hora_inicio_agenda, 'yyyy-MM-dd HH:mm', 'en-US'),
                end: formatDate(agenda.fecha_agenda + ' ' + agenda.hora_inicio_agenda, 'yyyy-MM-dd HH:mm', 'en-US'),
                borderColor: '#3ebfea',
                backgroundColor: '#3ebfea',
                textColor: '#fff',
                extendedProps: {
                  id_agenda: agenda.id_agenda,
                  id_persona: agenda.id_persona,
                  indice_agenda: index
                },
              });
            });
        }
      }
    );
  }

  handleDateClick(arg: any) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?') && !this.notSupported) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay,
        borderColor: '#3ebfea',
        backgroundColor: '#3ebfea',
        textColor: '#fff'
      });
    }
  }  

  handleEventClick(arg: any) {
    // console.log(arg);
    // console.log(arg.event.extendedProps.id_agenda);
    // console.log(arg.event.extendedProps.id_persona);
    this.getEmprendedor(arg.event.extendedProps.id_persona);
    this.getArchivos(arg.event.extendedProps.id_persona, 'MODELO_NEGOCIO');
    this.agendaSeleccionada = this.agendaAT[arg.event.extendedProps.indice_agenda];
    // console.log(this.agendaSeleccionada);
  }

  getEmprendedor(idPersona: number): void {
    this.emprendedorService.getEmprendedorAT(idPersona)
    .subscribe(
      emprendedor => {
        this.emprendedor = emprendedor;
        //this.showView = true;
      }
    );
  }

  getArchivos(idPersona: number, daemon: string): void {
    this.emprendedorService.getArchivos(idPersona, daemon)
    .subscribe(
      archivos => {
        this.archivos = archivos;
        this.showView = true;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicio/Agenda.service';
import { EventInput } from '@fullcalendar/core';

import * as moment from 'moment';
import * as ics from 'ics';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CatalogoService } from 'src/app/servicio/catalogo.service';


@Component({
  selector: 'app-agendarPageAT',
  templateUrl: './agendarPageAT.component.html',
  styleUrls: ['./agendarPageAT.component.scss']
})
export class AgendarPageATComponent implements OnInit {

  horarios: [];
  listaEventos: EventInput[];
  maxDay: number;
  minHoras: number;
  agenda;
  id_sub_programa;
  fase;


  constructor(
    private agendaService: AgendaService,
    private programaService: ProgramaService,
    private router: Router,
    private mensajeService: MensajeService,
    private catalogoService: CatalogoService) { }

  ngOnInit() {
    if (!this.programaService.programa_selecionada)
      this.router.navigate([environment.home]);
    this.consultarDisponibilidad();
  }

  consultarDisponibilidad() {
    let self = this;
    this.agendaService.getHorarioDisponibilidadAT().subscribe(data => {
      console.log(data);
      if (data.codigo === '1') {
        self.listaEventos = [];
        self.horarios = data.data.horarios;
        data.data.horarioMes.forEach(function (item) {
          item.disponibilidad.forEach(function (hora) {
            var evento: EventInput = {
              groupId: 'disponibleID',
              start: item.fecha + 'T' + hora.hora_inicio,
              end: item.fecha + 'T' + hora.hora_fin,
              rendering: 'background',
              backgroundColor: '#4dd636', // #8fdf82
              is_new: false,
              stick: true
            };
            self.listaEventos.push(evento);
            //$('#calendar').fullCalendar('renderEvent', evento, true);
          });
          item.noDisponibilidad.forEach(function (hora) {
            var evento = {
              groupId: 'noDisponibleID',
              title: 'No disponible',
              start: item.fecha + 'T' + hora.hora_inicio,
              end: item.fecha + 'T' + hora.hora_fin,
              borderColor: '#f44236',
              backgroundColor: '#f44236',
              textColor: '#fff',
              stick: true,
              editable: false,
              overlap: false,
              is_new: false
            };
            self.listaEventos.push(evento);
            //$('#calendar').fullCalendar('renderEvent', evento, true);
          });
        });
        this.maxDay = data.data.maxDias;
        this.minHoras = data.data.minHora;
      }
    });

  }

  setEvento(eventApi) {
    let evento: any = {};
    evento.fecha = moment(eventApi.start).format('YYYY-MM-DD');
    evento.hora_inicio = moment(eventApi.start).format('HH:mm:ss');
    evento.hora_fin = moment(eventApi.end).format('HH:mm:ss');
    evento.id_persona = this.programaService.programa_selecionada.sub_programa.id_persona;
    evento.tipo = 'ASISTENCIA TECNICA';
    evento.estado = 'AG';
    let d = moment(eventApi.start).weekday();
    if (d == 7)
      d = 0;
    evento.diaN = d;
    evento.fase = this.programaService.programa_selecionada.sub_programa.fase;
    evento.start = eventApi.start;
    evento.end = eventApi.end;
    evento.id_tipo_asistencia = eventApi.extendedProps.id_tipo_asistencia;
    this.agenda = evento;
    this.agendar();
  }

  agendar() {
    if (!this.agenda) {
      this.mensajeService.alertError(null, 'Debe seleccionar un horario');
      return;
    }
    let self = this.programaService;
    this.agendaService.grabarAgendaAT(this.agenda).subscribe(data => {
      if (data.codigo == '1') {
        self.actividad_selecionada.id_agenda = data.data.id_agenda;
        self.actividad_selecionada.id_asistente_tecnico = data.data.id_asistente_tecnico;
        self.finalizar_actividad().subscribe(resp => {
          if (resp.codigo == '1') {
            var d1 = moment(this.agenda.start).format().replace(/-/g, "").replace(/:/g, "");
            var d2 = moment(this.agenda.end).format().replace(/-/g, "").replace(/:/g, "");
            var email1 = resp.data.agenda.email1;
            var email2 = resp.data.agenda.email2;
            var link = encodeURI('https://calendar.google.com/calendar/r/eventedit?text=Asistencia técnica&dates=' + d1 + '/' + d2 + '&details=Asistencia técnica&add=' + email1 + '&add=' + email2);

            this.agenda.organizer = { name: 'Nombre1', email: email1 };
            this.agenda.attendees = [
              { name: resp.data.agenda.nombre1, email: email1 },
              { name: resp.data.agenda.nombre2, email: email2 }
            ];
            Swal.fire({
              title: "Agendado con éxito",
              html: '<div class="row"><div class="col-12"><p>Agrégalo a tu calendario</p>' +
                '<div class="btn-group" role="group" aria-label="button groups">' +
                '<a class="btn btn-info btn-sm text-whie" href="' + link + '" target="_blank">Google Calendar</a>' +
                '<a class="btn btn-warning btn-sm text-white"' +
                ' onclick="javascript:document.getElementById(\'descargarICS\').click();">Exportar iCal</a>' +
                '</div></div></div>',
              showCancelButton: false,
              type: 'info',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['/paginas/servicios/programas/subprograma/etapa/' + this.programaService.programa_selecionada.sub_programa.id_sub_programa + '/' + this.programaService.programa_selecionada.sub_programa.fase]);
              }
            });
            /*this.mensajeService.alertHTML("Agendado con éxito",'<div class="row"><div class="col-12"><p>Agrégalo a tu calendario</p>' +
            '<div class="btn-group" role="group" aria-label="button groups">' +
            '<a class="btn btn-info btn-sm text-whie" href="' + link + '" target="_blank">Google Calendar</a>' +
            '<a class="btn btn-warning btn-sm text-white"'+
            ' onclick="javascript:document.getElementById(\'descargarICS\').click();">Exportar iCal</a>' +
            '</div></div></div>');*/
          }
          else {
            this.mensajeService.alertError(null, resp.mensaje);
          }
        });
      } else {
        this.mensajeService.alertError(null, data.mensaje).then((result) => {
          if (result.value) {
            this.listaEventos = null;
            setTimeout(() => {
              this.consultarDisponibilidad();
            }, 500);
          }
        });;
      }
    });
  }

  descargarICS() {
    let start: ics.DateArray;
    let startSTR = moment(this.agenda.start).format('YYYY-M-D-H-m').split("-");
    switch (startSTR.length) {
      case 3:
        start = [parseInt(startSTR[0]), parseInt(startSTR[1]), parseInt(startSTR[2])];
        break;
      case 4:
        start = [parseInt(startSTR[0]), parseInt(startSTR[1]), parseInt(startSTR[2]), parseInt(startSTR[3])];
        break;
      case 5:
        start = [parseInt(startSTR[0]), parseInt(startSTR[1]), parseInt(startSTR[2]), parseInt(startSTR[3]), parseInt(startSTR[4])];
        break;
    }
    let end = moment().add({ 'hours': 2, "minutes": 30 }).format("YYYY-M-D-H-m").split("-")

    ics.createEvent({
      start: start,
      duration: { hours: 1, minutes: 0 },
      title: 'Asistencia tecnica',
      description: 'Asistencia tecnica',
      status: 'CONFIRMED',
      organizer: this.agenda.organizer,
      attendees: this.agenda.attendees
    }, (error, value) => {
      if (error) {
        console.log(error)
      }
      var file = new File([value], "asistencia_tecnica.ics", { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(file);
    })
  }
}

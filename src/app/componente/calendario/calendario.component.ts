import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { IEvent, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { Subscription } from 'rxjs';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import listView from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Persona } from 'src/app/estructuras/persona';
import { General } from 'src/app/estructuras/General';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import Swal from 'sweetalert2';
import { AgendaService } from 'src/app/servicio/Agenda.service';

import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  @ViewChild('modalEvento', { static: false }) private modalEvento;

  constructor(private lightboxEvent: LightboxEvent,
    private catalogoService: CatalogoService,
    private agendaService: AgendaService,
    private mensajeService: MensajeService) { }

  @Input() persona: Persona;

  public notSupported = false;
  private subscription: Subscription;

  locales = [esLocale];

  evento;
  observacion;
  id_motivo;

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listView];
  calendarWeekends = true;
  calendarAgenda: EventInput[];

  listaMotivoCancelar=[];
  motivosCancelar={};

  fechaActual = General.getFechaActual();

  ngOnInit() {
    const isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIE) {
      this.notSupported = true;
    }
    this.cargarAgenda();
    this.catalogoService.getListaMotivoCancelar().subscribe(data=>{
      if(data.codigo == '1'){
        this.motivosCancelar = General.getDataOptionAlert(data.data);
        /*data.data.forEach(item => {
          this.motivosCancelar[item.id] = item.nombre;
        });*/
      }
    });
  }

  eventClick(event) {
    if (event.event.extendedProps.url1) {
      window.open(event.event.extendedProps.url1, "_blanck");
    }
    this.evento = event.event.extendedProps;
    this.modalEvento.show();
    return false;
  }

  cargarAgenda(): void {
    this.catalogoService.post('agenda/agendaPersonal', { id_persona: this.persona.id_persona }).subscribe(data => {
      if (data.data instanceof Array) {
        this.calendarAgenda = data.data as EventInput[];
      }
    });
  }

  open(index: number): void {
    this.subscription = this.lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this.subscription.unsubscribe();
    }
  }

  cancelarAgenda() {
    let self = this;
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Sig &rarr;',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Motivo de cancelación',
        text: 'Seleccione el motivo por el cual está cancelando la agenda',
        input: 'select',
        inputOptions: self.motivosCancelar,
        preConfirm: function (value) {
          if(!value){
            Swal.showValidationMessage('Debe ingresar el detalle');
          }else{
            if(value.trim()==''){
              Swal.showValidationMessage('Debe ingresar el detalle');
            }else{
              self.id_motivo = value;
            }
          }
        }
      },
      {
        title: 'Observacion',
        text: 'Ingrese un detalle del motivo de la cancelación.',
        preConfirm: function (value) {
          if(!value){
            Swal.showValidationMessage('Debe ingresar el detalle');
          }else{
            if(value.trim()==''){
              Swal.showValidationMessage('Debe ingresar el detalle');
            }else{
              self.observacion = value;
            }
          }
        }
      }
    ]).then((result) => {
      if (result.value) {
        this.agendaService.cancelarAgenda(this.evento.id_agenda, this.id_motivo, this.observacion).subscribe(data => {
          if (data.codigo == "1") {
            this.mensajeService.alertEpico();
            this.cargarAgenda();
          } else {
            this.mensajeService.alertError(null, data.mensaje);
          }
        });
      }
    });    
  }
}

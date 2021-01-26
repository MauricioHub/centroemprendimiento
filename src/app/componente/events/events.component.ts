import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AgendaService } from 'src/app/servicio/Agenda.service';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { Agenda } from 'src/app/interfaces/agenda';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import Swal from 'sweetalert2';
import { EventoService } from 'src/app/servicio/Evento.service';
import { General } from 'src/app/estructuras/General';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input() estado='A';
  @Input() fecha_desde;
  @Input() id_tipo_evento;
  @Input() id_persona;
  @Input() size = "medium";
  @Input() title = "Eventos";

  @Output() getAgenda = new EventEmitter<any>();

  @Input() codigo: string;


  listaEventos;
  agenda: Agenda;
  public vista: number = 1;

  constructor(private catalogoService: CatalogoService,
    private agendaService: AgendaService,
    private mensajeService: MensajeService,
    private eventoService: EventoService) { }

  ngOnInit() {
    this.consultarEventos();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.codigo = changes.codigo.currentValue;
    if (this.codigo)
      this.consultarEventos();
    else
      this.listaEventos = [];
  }

  consultarEventos() {
    this.listaEventos = [];
    this.eventoService.getEventos({ estado: this.estado, codigo: this.codigo, fecha_desde: this.fecha_desde, id_tipo_evento: this.id_tipo_evento }).subscribe(
      data => {
        if (data.codigo == '1') {
          this.listaEventos = data.data;
        }
      }
    );
  }

  registrar(evento) {
    this._registrar(evento);
    /*Swal.fire({
      title: 'Confirmación!',
      text: "¿Desea inscribirse en el taller?",
      showCancelButton: true,
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._registrar(evento);
      }
    })*/
  }

  _registrar(evento) {
    this.agenda = {
      id_agenda: null,
      id_persona: this.id_persona,
      persona1: null,
      id_persona2: null,
      persona2: null,
      tipo_agenda: evento.tipo_evento,
      tipo: evento.tipo_evento,
      fecha_agenda: evento.fecha,
      fecha: evento.fecha,
      hora_inicio_agenda: evento.hora_inicio,
      hora_inicio: evento.hora_inicio,
      hora_fin_agenda: evento.hora_fin,
      hora_fin: evento.hora_fin,
      hora_inicio_reunion: null,
      hora_fin_reunion: null,
      estado_agenda: "AG",
      estado_reunion: null,
      estado: "AG",
      tema_agenda: evento.nombre,
      tema: evento.nombre,
      id_evento: evento.id,
      color: evento.color
    };

    this.agendaService.grabarAgendaEvento(this.agenda).subscribe(data => {
      if (data.codigo == '1') {
        this.agenda.id_agenda = data.data.id_agenda;
        this.mensajeService.alertOK(null, 'Ya estás registrado, enviamos a tu correo la información completa del taller.');
        setTimeout(() => {
          this.getAgenda.emit(this.agenda);
        }, 2000);
      } else {
        if (data.codigo == '2') {
          this.mensajeService.alertError(null, data.mensaje);
          this.consultarEventos();
        } else {
          this.mensajeService.alertError(null, data.mensaje);
        }
      }
    })
  }

}

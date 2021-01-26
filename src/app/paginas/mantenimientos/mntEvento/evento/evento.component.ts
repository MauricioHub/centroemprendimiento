import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { General } from 'src/app/estructuras/General';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { EventoService } from 'src/app/servicio/Evento.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit, AfterViewInit {

  @ViewChild('editarModal', { static: false }) private editarModal;
  @Input() registro;
  @Input() isHorario;
  @Output() getEvento = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();

  campos = ["nombre", "estado", "fecha", "hora_inicio", "hora_fin", "url", "id_tipo_evento", "codigo", "id_evento_mec", "color", "cupo"];

  listaEventoMEC;
  listaTipoEvento;

  constructor(private catalogoService: CatalogoService,
    private mensajeService: MensajeService,
    private eventoService: EventoService) {

  }

  ngOnInit() {
    if(!this.registro){
      this.registro = null;
      this.isHorario = false;
      this.registro = {};
      this.campos.forEach(item => {
        this.registro[item] = null;
      });
    }
  }

  ngAfterViewInit(): void {
    let fechaActual = General.getFechaActual();
    this.catalogoService.getEventosEpico(fechaActual).subscribe(data => {
      console.log(data);
      if (data.codigo == '1') {
        this.listaEventoMEC = data.data;
      }
    });
    this.catalogoService.getListaTipoEvento().subscribe(data => {
      if (data.codigo == '1') {
        this.listaTipoEvento = data.data;
      }
    });
    setTimeout(() => {
      this.editarModal.show();
    }, 50);
  }

  grabar() {
    this.eventoService.grabarEvento(this.registro).subscribe(data => {
      if (data.codigo == '1') {
        this.mensajeService.alertOK();
        this.editarModal.hide();
        this.getEvento.emit(this.registro);
      }
      else {
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  _cancelar() {
    this.cancelar.emit(this.registro);
    this.editarModal.hide();
  }

}

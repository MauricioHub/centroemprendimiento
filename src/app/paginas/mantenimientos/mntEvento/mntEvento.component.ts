import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { General } from 'src/app/estructuras/General';
import { Mantenimiento } from 'src/app/interfaces/Mantenimiento';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { EventoService } from 'src/app/servicio/Evento.service';
import { GeneralService } from 'src/app/servicio/mantenimiento/General.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mntEvento',
  templateUrl: './mntEvento.component.html',
  styleUrls: ['./mntEvento.component.css']
})
export class MntEventoComponent extends Mantenimiento implements OnInit, AfterViewInit, OnDestroy {

  nombre: string = "";
  estado: string = "T";

  tabla = "evento"
  campos = ["nombre", "estado", "fecha", "hora_inicio", "hora_fin", "url", "id_tipo_evento", "codigo", "id_evento_mec", "color", "cupo"];
  camposLista = [{ attr: "id", name: "Id" }, { attr: "nombre", name: "Evento" }, { attr: "tipo_evento", name: "Tipo evento" }, { attr: "codigo", name: "Codigo padre" }, { attr: "color", name: "Color" }];

  listaEventoMEC;
  listaTipoEvento;

  @ViewChild('editarModal', { static: false }) private editarModal;
  @ViewChild('horarioModal', { static: false }) private horarioModal;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private catalogoService: CatalogoService,
    private generalService: GeneralService,
    private mensajeService: MensajeService,
    private eventoService: EventoService) {
    super();
  }

  ngOnInit() {
    let fechaActual = General.getFechaActual();
    this.consultarDatos();
    this.catalogoService.getEventosEpico(fechaActual).subscribe(data => {
      if (data.codigo == '1') {
        this.listaEventoMEC = data.data;
      }
    });
    this.catalogoService.getListaTipoEvento().subscribe(data => {
      if (data.codigo == '1') {
        this.listaTipoEvento = data.data;
      }
    });
  }

  setLista(lista) {

  }

  setData(registro) {
    this.registro = registro;
  }

  grabar() {
    this.eventoService.grabarEvento(this.registro).subscribe(data => {
      if (data.codigo == '1') {
        this.mensajeService.alertOK();
        this.editarModal.hide();
        this.consultarDatos();
      }
      else {
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  eliminar(dato) {
    this.registro = dato;
    Swal.fire({
      title: 'Confirmación!',
      text: "¿Está seguro que desea eliminar?",
      showCancelButton: true,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.registro.estado = 'I';
        if (this.grabarControlador) {
          this.grabar();
        }
      }
    })
  }

  editar(dato, is_horario?) {
    this.registro = null;
    this.isHorario = false;
    this.registro = dato;
    //this.editarModal.show();
  }

  nuevo() {
    this.registro = null;
    this.isHorario = false;
    this.registro = {};
    this.campos.forEach(item => {
      this.registro[item] = null;
    });
    //this.editarModal.show();
  }

  listaHorarios;
  eventoPadre;
  isHorario = false;
  horarios(evento) {
    this.eventoPadre = evento;
    let param = { codigo: evento.codigo };
    this.eventoService.getEventos(param).subscribe(data => {
      if (data.codigo == '1') {
        this.listaHorarios = data.data;
      }
    });
    this.horarioModal.show();
  }

  nuevoHorario() {
    this.horarioModal.hide();
    this.nuevo();
    this.registro.nombre = this.eventoPadre.nombre;
    this.registro.hora_inicio = this.eventoPadre.hora_inicio;
    this.registro.hora_fin = this.eventoPadre.hora_fin;
    this.registro.id_tipo_evento = this.eventoPadre.id_tipo_evento;
    this.registro.codigo = this.eventoPadre.codigo;
    this.registro.id_evento_mec = this.eventoPadre.id_evento_mec;
    this.registro.color = this.eventoPadre.color;
    this.registro.cupo = this.eventoPadre.cupo;
    this.registro.estado = this.eventoPadre.estado;
    this.isHorario = true;
  }

  consultarDatos() {
    this.catalogoService.getEventosU().subscribe(data => {
      if (data.codigo == '1') {
        this.lista = data.data;
        this.rerender();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw();
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  setEvento($vento){
    this.consultarDatos();
  }

  cancelar($vento){
    this.registro = null;
  }

}

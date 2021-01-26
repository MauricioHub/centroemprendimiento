import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { TablaMaestro } from 'src/app/interfaces/tablaMaestro';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SeguridadService } from 'src/app/servicio/mantenimiento/Seguridad.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { GeneralService } from 'src/app/servicio/mantenimiento/General.service';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, AfterViewInit, OnDestroy {

  nombre: string = "";
  estado: string = "T";
  @Input() lista: TablaMaestro[];
  @Input() tabla: string;
  @Input() campos: Array<string>;
  @Input() camposLista: Array<any>;// = [{attr:"id", name:"Id"}, {attr:"nombre", name:"Nombre"}];
  @Input() grabarControlador = true;
  @Input() openModal = true;
  @Input() isComponent = false;
  @Output() getData = new EventEmitter<any>();
  @Output() eventNew = new EventEmitter<any>();
  @Output() eventEdit = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() getLista = new EventEmitter<any>();

  dato: TablaMaestro = { id: null, nombre: null, estado: null };

  @ViewChild('editarModal', { static: false }) private editarModal;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  generarConsulta = true;


  constructor(private rutaActiva: ActivatedRoute,
    private generalService: GeneralService,
    private mensajeService: MensajeService) {
  }

  ngOnInit() {
    if (this.lista) {
      this.generarConsulta = false;
    }
    if (!this.isComponent) {
      this.rutaActiva.params.subscribe(
        (params: Params) => {
          this.tabla = params.tabla;
          this.camposLista = [{ attr: "id", name: "Id" }, { attr: "nombre", name: "Nombre" }];
          this.consultarDatos();
        }
      );
    }
    if (this.tabla && !this.lista) {
      this.consultarDatos();
    }

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  consultarDatos() {
    this.generalService.getListaTabla(this.tabla, this.estado, this.nombre).subscribe(data => {
      if (data.codigo == '1') {
        this.lista = data.data;
        this.getLista.emit(this.lista);
        this.rerender();
        //this.dtTrigger.next();
      } else {
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //dtInstance.clear().draw();
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  editar(dato) {
    this.dato = dato;
    this.getData.emit(this.dato);
    this.eventEdit.emit(this.dato);
    if (this.openModal)
      this.editarModal.show();
  }

  nuevo() {
    this.dato = { id: null, nombre: null, estado: null };
    this.getData.emit(this.dato);
    this.eventNew.emit(this.dato);
    if (this.openModal)
      this.editarModal.show();
  }

  grabar() {
    this.getData.emit(this.dato);
    if (this.grabarControlador) {
      this.generalService.grabar(this.tabla, this.dato, this.campos).subscribe(data => {
        if (data.codigo == '1') {
          this.mensajeService.alertOK();
          this.editarModal.hide();
          if (this.generarConsulta) {
            this.consultarDatos();
          }
          else {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
        else {
          this.mensajeService.alertError(null, data.mensaje);
        }
      });
    } else {
      this.editarModal.hide();
    }
    this.save.emit(this.dato);
  }

  eliminar(dato) {
    this.dato = dato;
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
        this.dato.estado = 'I';
        this.getData.emit(this.dato);
        if (this.grabarControlador) {
          this.grabar();
        }
        this.delete.emit(this.dato);
      }
    })
  }

}

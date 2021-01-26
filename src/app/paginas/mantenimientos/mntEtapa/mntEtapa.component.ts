import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Mantenimiento } from 'src/app/interfaces/Mantenimiento';
import { MntProgramaService } from 'src/app/servicio/mantenimiento/MntPrograma.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ProgramaService } from 'src/app/servicio/Programa.service';

@Component({
  selector: 'app-mntEtapa',
  templateUrl: './mntEtapa.component.html',
  styleUrls: ['./mntEtapa.component.css']
})
export class MntEtapaComponent extends Mantenimiento implements OnInit, AfterViewInit, OnDestroy {

  tabla = "actividad_etapa"
  campos;
  camposLista = [{ attr: "id", name: "Id" }, { attr: "nombre", name: "Etapa" }, { attr: "orden", name: "Orden" }, { attr: "sub_programa", name: "Sub Programa" }];

  editarEtapa;
  idSubPrograma = 1;
  idPrograma = 1;

  listaProgramas;
  listaSubPrograma;

  lista;

  @ViewChild('editarModal', { static: false }) private editarModal;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private mntProgramaService: MntProgramaService,
    private mensajeService: MensajeService,
    private catalogoService: CatalogoService,
    private programaService: ProgramaService) {
    super();
    this.grabarControlador = false;
  }

  ngOnInit() {
    this.catalogoService.getListaPrograma().subscribe(data => {
      if (data.codigo == '1') {
        this.listaProgramas = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de programa');
      }
    });
    this.consultarSubProgramas();
    this.consultarEtapas();
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

  consultarSubProgramas() {
    this.catalogoService.getListaSubPrograma(this.idPrograma).subscribe(data => {
      if (data.codigo == '1') {
        this.listaSubPrograma = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de sub programa');
      }
    });
  }

  consultarEtapas() {
    this.lista = [];
    this.mntProgramaService.getEtapas(this.idSubPrograma).subscribe(data => {
      if (data.codigo == '1') {
        this.lista = data.data;
        this.rerender();
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de sub programa');
      }
    });
  }

  setLista(lista) {

  }

  grabar(etiqueta) {

  }

  eliminar(etiqueta) {

  }

  eventNew(): void {
    this.dtTrigger.unsubscribe();
    this.registro = null;
    this.editarEtapa = true;
  };

  eventEditar(registro): void {
    this.dtTrigger.unsubscribe();
    this.registro = registro;
    this.editarEtapa = true;
  };

  cancelar() {
    this.editarEtapa = false;
    //this.dtTrigger = new Subject();
  }

  ordenarActividades(registro){
    this.registro = registro;
    this.editarModal.show();
    this.consultarActividades();
  }

  consultarActividades() {
    this.actividades = null;
    this.mntProgramaService.getActividades(this.registro.id, 'A').subscribe(data => {
      if (data.codigo == '1') {
        data.data.forEach(element => {
          element.child= [];
          element.pid = element.id_actividad_padre;
        });
        this.actividades = this.programaService.armarArbolActividades(data.data, null);
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de activudades');
      }
    });
  }

  grabarActividades(){
    this.actividadesOrdenadas=[];
    this.armarOrdenActividades(this.actividades, null);
    this.mntProgramaService.grabarMultiplesActividades(this.actividadesOrdenadas).subscribe(data=>{
      if(data.codigo=='1'){
        this.mensajeService.alertEpico();
        this.editarModal.hide();
      }else{
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  actividades;
  actividadesOrdenadas:any[];
  armarOrdenActividades(lista, id_padre){
    let orden=1;
    lista.forEach(item => {
      item.antecesor = null;
      item.predecesor = null;
      if(orden>1){
        item.antecesor = lista[orden-2].id;
      }
      if(orden<lista.length){
        item.predecesor = lista[orden].id;
      }
      item.orden = orden;
      item.id_actividad_padre = id_padre;
      item.child = this.armarOrdenActividades(item.child, item.id);
      orden++;
      this.actividadesOrdenadas.push(item);
    });
    return lista;
  }
}

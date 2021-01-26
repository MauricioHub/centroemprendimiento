import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from 'src/app/interfaces/Mantenimiento';
import { MntProgramaService } from 'src/app/servicio/mantenimiento/MntPrograma.service';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Actividad_etapa } from 'src/app/estructuras/actividad_etapa';

@Component({
  selector: 'app-mntActividad',
  templateUrl: './mntActividad.component.html',
  styleUrls: ['./mntActividad.component.scss']
})
export class MntActividadComponent extends Mantenimiento implements OnInit {

  tabla = "actividad_etapa"
  campos;
  camposLista = [{ attr: "id", name: "Id" }, { attr: "nombre", name: "Actividad" }, { attr: "orden", name: "Orden" }, { attr: "sub_programa", name: "Sub Programa" }, { attr: "etapa", name: "Etapa" }, { attr: "tipo_actividad", name: "Tipo actividad" }];

  listaProgramas;
  listaSubPrograma;
  listaEtapas;

  idPrograma = 1;
  idSubPrograma = 1;
  idEtapa = 1;

  editarActividad = false;

  constructor(private mntProgramaService: MntProgramaService,
    private catalogoService: CatalogoService,
    private mensajeService: MensajeService) {
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
    this.consultarActividades();
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
    this.catalogoService.getEtapasXSubPrograma(this.idSubPrograma).subscribe(data => {
      if (data.codigo == '1') {
        this.listaEtapas = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de sub programa');
      }
    });
  }

  consultarActividades() {
    this.lista = null;
    this.mntProgramaService.getActividades(this.idEtapa).subscribe(data => {
      if (data.codigo == '1') {
        this.lista = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de activudades');
      }
    });
  }

  setLista(lista) {

  }

  grabar(etiqueta) {

  }

  eliminar(etiqueta) {

  }

  eventNew(registro): void {
    this.registro = {};
    this.registro.id_etapa=this.idEtapa;
    this.editarActividad = true;
  };

  eventEditar(registro): void {
    this.registro = registro as Actividad_etapa;
    this.editarActividad = true;
  };

  cancelar(){
    this.editarActividad = false;
  }

}

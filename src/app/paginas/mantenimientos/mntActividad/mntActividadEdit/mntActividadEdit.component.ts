import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { MntProgramaService } from 'src/app/servicio/mantenimiento/MntPrograma.service';
import { HttpResponse } from '@angular/common/http';
import { Actividad_etapa } from 'src/app/estructuras/actividad_etapa';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-mntActividadEdit',
  templateUrl: './mntActividadEdit.component.html',
  styleUrls: ['./mntActividadEdit.component.scss']
})
export class MntActividadEditComponent implements OnInit, AfterViewInit {

  @Output() cancelar=new EventEmitter<any>();
  @Input() idEtapa;
  @Input() idPrograma;
  @Input() idSubPrograma;
  @Input() actividad: Actividad_etapa;

  @Input() listaProgramas;
  @Input() listaSubPrograma;
  @Input() listaEtapas;
  ordenAux;
  idEtapaAux;

  editarCabecera=true;

  listaActividades;
  listaActividadesT;
  listaActividadesI: IOption[];
  listaTipoActividad;
  listaTipoEjecucion;
  listaAplicacionExterna;
  listaArchivosNemonico;
  listaRubricas;

  listaTalleres;

  logoFile;
  iconoFile;
  bannerFile;
  archivoFile;

  actividadesParalelo;

  constructor(private catalogoService: CatalogoService,
    private mensajeService: MensajeService,
    private mntProgramaService: MntProgramaService) { }

  ngOnInit() {
    this.ordenAux=this.actividad.orden;
    this.idEtapaAux = this.actividad.id_etapa;
    if(this.actividad.id){
      this.editarCabecera=false;
      if(this.actividad.actividad_paralelo){
        let actividadesParalelo = this.actividad.actividad_paralelo.split(',');
        this.actividadesParalelo = [];
        actividadesParalelo.forEach(element => {
          this.actividadesParalelo.push(parseInt(element));
        });
      }
    }else{
      this.actividad = {id: null,
        nombre: null,
        actividad: null,
        estado: 'A',
        id_etapa: this.idEtapa,
        id_tipo_actividad: null,
        orden: null,
        antecesor: null,
        predecesor: null,
        hora_max: null,
        hora_min: null,
        cod_referencia: null,
        icono: null,
        logo: null,
        banner: null,
        actividad_igual: null,
        url: null,
        aprueba_etapa: null,
        id_tipo_ejecucion: null,
        archivo_actividad: null,
        url_archivo_actividad: null,
        boton_finalizar: null,
        boton_guardar: null,
        id_rubrica: null,
        archivo: null,
        componente:null,
        nemonico_file:null,
        cod_aplicacion_externa:null,
        cod_trama:null,
        id_actividad_padre:null,
        metodo_api: null,
        actividad_paralelo: null,
        mensaje_estado_ina: null,
        listaMensajes:[]
      };
    }
    if(!this.listaProgramas){
      this.catalogoService.getListaPrograma().subscribe(data => {
        if (data.codigo == '1') {
          this.listaProgramas = data.data;
        } else {
          this.mensajeService.alertError(null, 'Error en la carga de programa');
        }
      });
    }
    let id_actividad_etapa=this.actividad.id;
    if(!id_actividad_etapa){
      id_actividad_etapa = 0;
    }
    this.mntProgramaService.getMensajeEstadoActividadEtapa(id_actividad_etapa).subscribe(data=>{
      if(data.codigo=="1"){
        this.actividad.listaMensajes = data.data;
      }
    });
    console.log(this.actividad);
    this.catalogoService.getListaTipoActividad().subscribe(data => {
      if (data.codigo == '1') {
        this.listaTipoActividad = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de programa');
      }
    });
    if(!this.listaSubPrograma){
      this.consultarSubProgramas();
    }
    this.catalogoService.getListaActividadesSubPrograma(this.idSubPrograma).subscribe(data => {
      if (data.codigo == '1') {
        this.listaActividadesT = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de activudades');
      }
    });
    this.catalogoService.getAplicacionesExterna().subscribe(data => {
      if (data.codigo == '1') {
        this.listaAplicacionExterna = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de Aplicaciones');
      }
    });
    this.catalogoService.getListaTipoEjecucion().subscribe(data => {
      if (data.codigo == '1') {
        this.listaTipoEjecucion = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de Aplicaciones');
      }
    });
    this.catalogoService.getListaArchivosNemonico().subscribe(data => {
      if (data.codigo == '1') {
        this.listaArchivosNemonico = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de Aplicaciones');
      }
    });
    this.catalogoService.getListaRubricas().subscribe(data => {
      if (data.codigo == '1') {
        this.listaRubricas = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de Aplicaciones');
      }
    });
    this.consultarTalleres();
    this.consultarEtapas();
    this.consultarActividades();
  }

  consultarTalleres(){
    this.catalogoService.getEventosU({estado:'A', id_tipo_evento:1}).subscribe(data=>{
      if(data.codigo=='1'){
        this.listaTalleres = data.data;
      }
    });
  }

  ngAfterViewInit(){

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
    this.listaActividadesI = null;
    if(!this.actividad.id_etapa)
      this.actividad.id_etapa = this.idEtapa;
    this.mntProgramaService.getActividades(this.actividad.id_etapa).subscribe(data => {
      if (data.codigo == '1') {
        this.listaActividades = data.data;
        this.listaActividadesI = [];
        data.data.forEach(element => {
          this.listaActividadesI.push({value: element.id,
            label: element.nombre
          });
        });
        this.calcularOrden();
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de activudades');
      }
    });
  }

  calcularOrden() {
    let maxOrden = 0;
    let self = this.actividad;
    if (!this.actividad.id || this.actividad.id_etapa != this.idEtapaAux) {
      if (this.actividad.id_etapa) {
        if (this.actividad.id_actividad_padre) {
          this.listaActividades.forEach(function (menu) {
            if (menu.id_actividad_padre == self.id_actividad_padre && menu.id_etapa == self.id_etapa) {
              if (maxOrden < menu.orden) {
                maxOrden = menu.orden;
              }
            }
          });
          this.actividad.orden = maxOrden + 1;
        } else {
          this.listaActividades.forEach(function (menu) {
            if (menu.id_actividad_padre == self.id_actividad_padre && menu.id_etapa == self.id_etapa) {
              if (maxOrden < menu.orden) {
                maxOrden = menu.orden;
              }
            }
          });
          this.actividad.orden = maxOrden + 1;
        }
      }
    }
    if(this.actividad.id_etapa == this.idEtapaAux && this.ordenAux){
      this.actividad.orden = this.ordenAux;
    }
  }

  _cancelar(){
    this.cancelar.emit();
  }

  completeCamposTA(){
    switch(this.actividad.id_tipo_actividad){
      case '3':
        this.actividad.id_tipo_ejecucion = 6;
        this.actividad.url="";
        this.actividad.componente = "SubirArchivoComponent";
        break;
      case '4':
        this.actividad.id_tipo_ejecucion = 7;
        this.actividad.url="paginas/centro_emprendimiento/agendarAsistenciaTecnica";
        break;
      case '10':
        this.actividad.id_tipo_ejecucion = 9;
        this.actividad.url="";
        this.actividad.boton_finalizar="NO";
        this.actividad.boton_guardar="NO";
        this.actividad.aprueba_etapa="NO";
        break;
      case '11':
        this.actividad.id_tipo_ejecucion = 7;
        this.actividad.url="paginas/centro_emprendimiento/evaluacion";
        break;
      case '12':
        this.actividad.id_tipo_ejecucion = 9;
        this.actividad.url="";
        this.actividad.componente = "";
        this.actividad.boton_finalizar="NO";
        this.actividad.boton_guardar="NO";
        this.actividad.aprueba_etapa="NO";
        break;
      default:      
        this.actividad.id_tipo_ejecucion = null;
        break;
    }
  }

  grabar(){
    if(this.actividadesParalelo){
      this.actividad.actividad_paralelo = this.actividadesParalelo.join(',');
    }
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.actividad));
    formData.append('logoFile', this.logoFile);
    formData.append('iconoFile', this.iconoFile);
    formData.append('bannerFile', this.bannerFile);
    formData.append('archivoFile', this.archivoFile);
    this.mntProgramaService.grabarActividadEtapa(formData).subscribe(data=>{
      if (data instanceof HttpResponse) {
        if(data.body.codigo=='0'){
          this.mensajeService.alertError(null,data.body.mensaje);
        }else{
          this.mensajeService.alertOK(null,data.body.mensaje);
          window.location.reload();
        }
      }
    });
  }

  nuevoTaller=false;

  cancelarTaller($vento){
    this.nuevoTaller=false;
  }

  setEvento(evento){
    this.consultarTalleres();
    this.actividad.cod_referencia = evento.codigo;
  }

}

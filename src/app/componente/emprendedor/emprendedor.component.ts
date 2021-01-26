import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';
import { General } from 'src/app/estructuras/General';
import { Persona } from 'src/app/estructuras/persona';
import { Usuario } from 'src/app/estructuras/usuario';
import { EmprendedorInter } from 'src/app/interfaces/Emprendedor';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emprendedor',
  templateUrl: './emprendedor.component.html',
  styleUrls: ['./emprendedor.component.scss']
})
export class EmprendedorComponent implements OnInit {

  @Input() persona: Persona;
  @Input() usuario: Usuario;
  @Input() emprendedor: EmprendedorInter;
  @Output() selectActividad = new EventEmitter();

  @ViewChild('asignarActividad', { static: false }) private asignarActividad;

  activeTab = "datos_personales";
  activeTabPrograma;

  id_sub_programa = 1;
  programa;

  columnas = 2;
  id_etapa: number;
  id_etapa_new: number;
  listaEtapa;

  etapaActual;

  constructor(private programaService: ProgramaService,
    private mensajeService: MensajeService,
    private catalogoService: CatalogoService) {
    this.activeTabPrograma = 'todos';
  }

  ngOnInit() {
    this.consultarProgramaInscrito();
    this.consultarEtapas();
  }

  consultarProgramaInscrito() {
    this.programaService.getProgramaInscrito(this.id_sub_programa, this.id_etapa, this.emprendedor.id_persona).subscribe(data => {
      if (data.codigo == '1') {
        this.programa = data.data;
        this.armarDatosPrograma(data.data);
      } else {
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  armarDatosPrograma(programa) {
    this.programa = programa;
    this.programa.etapa = {};
    this.programa.etapas.forEach(etapa => {
      if (etapa.id_etapa == this.programa.sub_programa.fase) {
        this.programa.etapa = etapa;
      }
    });
    this.programa.actividades.forEach(element => {
      element.selected = false;
      element.visible = true;
    });
    this.programa._actividades = this.programa.actividades;
    this.programa.actividades = this.programaService.armarArbolActividades(this.programa.actividades, null);
    if (!this.id_etapa) {
      this.id_etapa = this.programa.etapa.id_etapa;
      this.etapaActual = this.programa.etapa;
    }
  }

  consultarEtapas() {
    this.catalogoService.getEtapasXSubPrograma(this.id_sub_programa).subscribe(data => {
      if (data.codigo == '1') {
        this.listaEtapa = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de sub programa');
      }
    });
  }

  openEtapa(etapa): void {
    this.id_etapa = etapa.id_etapa;
    this.consultarProgramaInscrito();
  }

  _setActiveTab(tab) {
    this.activeTabPrograma = tab;
  }

  getActividades(actividades, tipo: number) {
    let lista = [];
    actividades.forEach(act => {
      act.visible = false;
      let subLista=[];
      switch (tipo) {
        case -1:
          act.visible = true;
          lista.push(act);
          break;
        case 0:
          if (act.id_tipo_actividad != 12 && act.id_tipo_actividad != 2) {
            if(this.agregarActividad(act, tipo)){
              lista.push(act);
            }
          }
          break;
        default:
          if (act.id_tipo_actividad == tipo) {
            if(this.agregarActividad(act, tipo)){
              lista.push(act);
            }
          }
          subLista=this.getActividades(act.child, tipo);
          if(subLista.length > 0){
            act.visible = true;
            lista.push(act);
          }
          break;
      }
    });
    return lista;
  }

  agregarActividad(act, tipo){
    if(act.child.length > 0){
      let subLista=this.getActividades(act.child, tipo);
      if(subLista.length > 0){
        act.visible = true;
        return true;
      }
    }else{
      act.visible = true;
      return true;
    }
    return false;
  }

  aprobarActividad(actividad) {
    if (!actividad.id_actividad_inscripcion) {
      this.mensajeService.alertError(null, 'No puede aprobar una actividad que no ha tomado aun el emprendedor');
      return;
    }
    Swal.fire({
      title: 'Confirmación!',
      html: "¿Está seguro que quiere aprobar esta actividad?",
      showCancelButton: true,
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        let estadoAnt = actividad.estado_actividad_inscripcion;
        actividad.selected = true;
        actividad.estado_actividad_inscripcion = 'AP';
        actividad.id_usuario_aprobacion = Usuario.getUser().id_usuario;
        actividad.id_usuario_mod = actividad.id_usuario_aprobacion;
        actividad.fecha_aprobacion = General.getFechaActualHora();
        this.programaService.actualizar_actividad(actividad).subscribe(data => {
          if (data.codigo == '1') {
            this.mensajeService.alertOK();
            this.armarDatosPrograma(data.data.sub_programa);
          } else {
            actividad.estado_actividad_inscripcion = estadoAnt;
            this.mensajeService.alertError(null, data.mensaje);
          }
        });
      }
    })
  }

  aprobarActividades() {
    this.programa._actividades.forEach(actividad => {
      if(actividad.selected){
        actividad.estado_actividad_inscripcion = 'AP';
        actividad.id_usuario_aprobacion = Usuario.getUser().id_usuario;
        actividad.id_usuario_mod = actividad.id_usuario_aprobacion;
        actividad.fecha_aprobacion = General.getFechaActualHora();
      }
    });
    this.programaService.aprobarActividades(this.programa._actividades).subscribe(data => {
      if (data.codigo == '1') {
        this.mensajeService.alertOK();
      } else {
        let html = "<ul class='text-left' style='font-size: 13px'>";
        data.data.forEach(element => {
          html += '<li>' + element.data.actividad + ': ' + element.mensaje + '</li>';
        });
        html += "</ul>";
        this.mensajeService.alertHTML("Las siguientes actividades no fueron aprobadas: ", "<div class='row justify-content-center text-center' style='padding-right: 10px;padding-left: 10px;'>"
          + html
          + "</div>");
      }
      this.consultarProgramaInscrito();
    });
  }

  aprobarEtapa(){
    let mensaje = "¿Está seguro que desea aprobar la etapa?";
    let html = "<ul class='text-left' style='font-size: 13px'>";
    let faltaAprobar=false;
    this.programa._actividades.forEach(element => {
      if(element.estado_actividad_inscripcion != 'AP'){
        html += '<li>' + element.actividad + '</li>';
        faltaAprobar = true;
      }
    });
    html += "</ul>";
    if(faltaAprobar){
      mensaje = 'Las siguientes actividades no estan finalizadas: ' + html + '<br>' + mensaje;
    }
    Swal.fire({
      title: 'Confirmación!',
      html: mensaje,
      showCancelButton: true,
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._aprobarEtapa();
      }
    })
  }

  _aprobarEtapa() {
    this.programaService.aprobarEtapa(this.programa.sub_programa.id_inscripcion, this.etapaActual.id_etapa, this.etapaActual.predecesor).subscribe(data => {
      if (data.codigo == '1') {
        this.mensajeService.alertOK();
      } else {
        this.mensajeService.alertHTML();
      }
    });
  }

  cambiarEtapa() {
    if(!this.id_etapa_new){
      this.mensajeService.alertError(null, 'Debe seleccionar la nueva etapa');
      return;
    }
    Swal.fire({
      title: 'Confirmación!',
      text: "¿Está seguro que desea cambiar la etapa del emprendedor?",
      showCancelButton: true,
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._cambiarEtapa();
      }
    })
  }

  _cambiarEtapa() {
    this.programaService.cambiarFase(this.programa.sub_programa.id_inscripcion, this.etapaActual.id_etapa, this.id_etapa_new).subscribe(data => {
      if (data.codigo == '1') {
        this.mensajeService.alertOK();
      } else {
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  revertirActividad(actividad) {
    if(actividad.estado_actividad_inscripcion != 'AP'){
      this.mensajeService.alertError(null, 'No puede revertir un estado diferente de aprobado');
      return;
    }
    Swal.fire({
      title: 'Confirmación!',
      text: "¿Está seguro que desea pasar la actividad a pendiente?",
      showCancelButton: true,
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._revertirActividad(actividad);
      }
    })
  }

  _revertirActividad(actividad) {
    actividad.id_usuario_mod = Usuario.getUser().id_usuario;
    this.programaService.revertirActividad(actividad).subscribe(data => {
      if (data.codigo == '1') {
        this.mensajeService.alertOK();
        this.consultarProgramaInscrito();
      } else {
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  listaActividadesAsignadas;
  listaActividades;
  listaActividadesNew;
  listaActividadesIni;
  public field: Object;
  @ViewChild(WizardComponent) private wizard: WizardComponent;
  asignarActividades(){
    this.listaActividadesAsignadas=null;
    this.listaActividadesNew=null;
    this.asignarActividad.show();
    this.programaService.getProgramaInscrito(this.id_sub_programa, this.etapaActual.id_etapa, this.persona.id_persona).subscribe(data =>{
      if(data.codigo == '1'){
        this.listaActividadesIni = data.data.actividades;
        this.listaActividadesAsignadas = this.programaService.armarArbolActividades(data.data.actividades, null);
      }
      //this.listaActividadesAsignadas.push({id_actividad_inscripcion:"0", id_actividad_padre: null, actividad: "Nuevas actividades", is_padre:false, isSelected: true, child:[]});
    });
    this.catalogoService.getListaActividadesSubPrograma(this.id_sub_programa).subscribe(data=>{
      if(data.codigo == '1'){
        let lista = [];
        let etapaAnt = "";
        let idEtapaAnt = 0;
        let etapa;
        data.data.forEach(element => {
          element.id_actividad_inscripcion='0';
          element.item = element.actividad;
          element.expandable = true;
          element.is_agregada_manual = 'NO';
          if(etapaAnt != element.etapa){
            //if(element.id_etapa == this.etapaActual.id_etapa){
              //etapa = {id_actividad_inscripcion:idEtapaAnt, id_actividad_padre: null, actividad: element.etapa, is_padre:true, isSelected: false, child:[], children:[], item: element.etapa, expandable: true};
              idEtapaAnt--;
              etapa = {};
              etapa.actividad = element.etapa;
              etapa.estado = 'A';
              etapa.etapa = element.etapa;
              etapa.expandible = true;
              etapa.id = idEtapaAnt;
              etapa.actividad = element.etapa;
              etapa.id_actividad_etapa= idEtapaAnt;
              etapa.id_actividad_inscripcion= idEtapaAnt;
              etapa.id_actividad_padre= null;
              etapa.id_etapa= element.id_etapa;
              etapa.id_sub_programa= element.id_sub_programa;
              etapa.id_tipo_actividad= idEtapaAnt;
              etapa.is_agregada_manual= "NO";
              etapa.item= element.etapa;
              etapa.nombre= element.etapa;
              etapa.sub_programa= element.sub_programa;
              etapa.tipo_actividad= "";
              lista.push(etapa);
              
            //}
            etapaAnt = element.etapa;
          }
          if(!element.id_actividad_padre){
            element.id_actividad_padre = idEtapaAnt;
          }
          lista.push(element);
          /*if(element.id_tipo_actividad != 13 && element.id_etapa == this.etapaActual.id_etapa){
            let act = {id_actividad_inscripcion:element.id, id_actividad_padre: idEtapaAnt, actividad: element.actividad, is_padre:false, isSelected: false, child:[], data: element, item: element.actividad, expandable: true};
            etapa.child.push(act);
            etapa.children.push(act);
          }*/
        });
        this.listaActividades = lista;
        this.listaActividadesNew = this.programaService.armarArbolActividades(lista, null, "children");
      }
    });
  }

  listaActividadesS;
  listaActividadesAlmacenar;

  grabarAsignacion(){
    console.log(this.listaActividadesOrden);
    this.armarOrdenActividades(this.listaOrdenada, null);
    console.log(this.actividadesOrdenadas);
    this.mensajeService.alertInfo(null, "Lamentamos los inconvenientes, esta opción se encuentra en mantenimiento");
    return;
    let actividades:any[]=[];
    if(!this.listaActividadesS){
      this.mensajeService.alertError(null,'Debe asignar por lo menos 1 actividad');
      return;
    }
    let actividadNueva=this.listaActividadesS[this.listaActividadesS.length-1];
    if(actividadNueva.child.length==0){
      this.mensajeService.alertError(null,'Debe asignar por lo menos 1 actividad');
      return;
    }
    let i=0;
    actividadNueva.child.forEach(item => {
      item.data.estado_actividad = null;
      if(i==0)
        item.data.estado_actividad = 'IN';
      actividades.push(item.data);
      i++;
    });
    this.programaService.asignarActividades(actividades, this.programa.sub_programa.id_inscripcion).subscribe(data=>{
      if(data.codigo == '1'){
        this.mensajeService.alertOK();
      }else{
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  listaActividadesOrden;
  setActividades(actividades){
    this.listaActividadesS = actividades; 
  }

  unirActividades(){
    if(!this.listaActividadesS){
      this.mensajeService.alertError(null,'Debe seleccionar por lo menos una actividad');
      return;
    }
    if(this.listaActividadesS.length == 0){
      this.mensajeService.alertError(null,'Debe seleccionar por lo menos una actividad');
      return;
    }
    this.listaActividadesOrden = null;
    let listaActividadesOrden = [];
    listaActividadesOrden.push({id:-1, id_actividad_etapa:-1, id_actividad_inscripcion:-1, id_actividad_padre: null, actividad: "Nuevas actividades", is_padre:true, isSelected: true, child:[]});
    let i=0;
    this.listaActividadesS.forEach(element => {
      if(element.selected && element.id > 0){
        let found = this.listaActividades.find(item => item.id == element.id && item.id_tipo_actividad != 13);
        if(found){
          //if(found.id_actividad_padre < 0)
            found.id_actividad_padre = -1;
          found.is_agregada_manual = 'SI';
          found.id_actividad_inscripcion = null;
          listaActividadesOrden.push(found);
          i++;
        }
      }
    });
    console.log(listaActividadesOrden);
    this.listaActividadesAlmacenar = listaActividadesOrden;
    this.listaActividadesOrden = this.listaActividadesAsignadas.concat(this.programaService._armarArbolActividadesAux(this.listaActividadesAlmacenar, null, "child")); 
    this.field = { 
      dataSource: this.listaActividadesOrden, 
      id: 'id_actividad_inscripcion',
      parentID: 'id_actividad_padre',
      text: 'actividad',
      hasChildren: 'is_padre',
      selected: 'isSelected'
    };
    this.wizard.goToNextStep();
  }

  listaOrdenada;
  getOrden(lista){
    this.listaOrdenada = lista;
  }
  
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

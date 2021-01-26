import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, AfterViewInit, ComponentRef } from '@angular/core';
import { Emprendedor } from 'src/app/estructuras/emprendedor';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';
import { Inscripcion, Actividad_inscripcion } from 'src/app/estructuras/inscripcion';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Persona } from 'src/app/estructuras/persona';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { General } from 'src/app/estructuras/General';
import { AgendaService } from 'src/app/servicio/Agenda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})
export class EtapaComponent implements OnInit, AfterViewInit {

  @Input() persona: Persona;
  @Input() emprendedor: Emprendedor = new Emprendedor();
  @Input() emprendimiento: Emprendimiento = new Emprendimiento();
  @Input() programa_selecionada:Inscripcion;

  btn_grabar=true;
  btn_grabarFinalizar=true;
  actividad_seleccionada;
  fecha_actual = General.getFechaActual();

  @Input() columnas=1;
  @ViewChild('actividadModal', { static: false }) private actividadModal;
  @ViewChild('actividadTaller', { static: false }) private actividadTaller;
  @ViewChild('contenidoExterno', {read: ViewContainerRef}) private contenidoExterno: ViewContainerRef;
  @ViewChild('cuerpoActividad', {read: ViewContainerRef}) private cuerpoActividad: ViewContainerRef;

  componentRef: ComponentRef<any> = null;

  constructor(private programaService: ProgramaService, 
    private mensajeService: MensajeService, 
    private componentFactoryResolver: ComponentFactoryResolver, 
    private agendaService: AgendaService,
    private router: Router) { 
    
  }

  ngOnInit() {
    console.log('Entro a etapa');
    console.log(this.programa_selecionada);
    let actualizarVista=true;
    this.actualizarActividadesCursos(this.programa_selecionada.actividades, actualizarVista);
    if(this.programa_selecionada.pasoEtapa == 'SI'){
      this.mensajeService.alertEpico('Felicitaciones!', 'Has concluido con todos los requerimientos necesarios para avanzar a la siguiente etapa de emprendimiento');
      //console.log(this.programa_selecionada);
      this.programaService.actualizarMensajeAprobacionEtapa(this.programa_selecionada.sub_programa.id_inscripcion, this.programa_selecionada.sub_programa.fase).subscribe();
    }
  }

  actualizarActividadesCursos(actividades, actualizarVista){
    actividades.forEach(act => {
      if(act.child.length > 0){
        this.actualizarActividadesCursos(act.child, true);
        actualizarVista = false;
      }
      if(act.estado_actividad_inscripcion == 'IN' && act.id_tipo_actividad==2){
        this.programaService.actualizar_actividad(act).subscribe(data=>{
          if(actualizarVista && data.codigo == '1'){
            data.data.sub_programa.actividades = this.programaService.armarArbolActividades(data.data.sub_programa.actividades, null);
            this.programa_selecionada = data.data.sub_programa;
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    if(this.programa_selecionada.levantarHome){
      let salir = false;
      this.programa_selecionada.actividades.forEach(act => {
        if(!salir){
          if((act.estado_actividad_inscripcion == 'IN') && act.id_tipo_actividad==8){
            this.ejecutar_actividad(act);
            salir = true;
          }
        }
      });
    }
  }

  getIcono(actividad){
    let css = "";
    switch(actividad.estado_actividad_inscripcion){
      case 'AP': css = "icon-check bg-c-green"; break;
      case 'EP': css = "icon-edit-1 bg-c-blue"; break;
      case 'IN': css = "icon-pause-circle bg-c-yellow"; break;
      case 'PE': css = "icon-pause-circle bg-c-yellow"; break;
      default : css = "icon-alert-circle bg-c-gris"; break;
    }
    return css;
  }

  ejecutar_actividad(actividad): void{
    this.actividad_seleccionada = null;
    this.actividad_seleccionada = actividad;
    this.programaService.actividad_selecionada = actividad;
    this.programaService.programa_selecionada = this.programa_selecionada;
    switch (actividad.id_tipo_actividad) {
      case 2:
        if(actividad.id_tipo_ejecucion == 11){
          this.mensajeService.alertInfo("Esta opción se habilitará muy pronto");
          return;
        }
        Swal.fire({
          title: "Recuerda: ",
          html: '<div class="row"><div class="col-12">'+
          '<p >Vas a ser redireccionado a la plataforma <strong>ATRÉVETE</strong> y al culminar cada módulo debes volver <strong>AQUÍ</strong> para continuar en tu Ruta del Emprendimiento.</p>' +
          '</div></div>',
          showCancelButton: false,
          type: 'info',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok, ¡Lo entendí!'
        }).then((result) => {
          if (result.value) {
            window.open(actividad.url_actividad_inscripcion, '_blank');
            this._finalizar_actividad();
          }
        });
        break;
      case 4:
        if (actividad.id_agenda) {
          let mensaje = "Ya realizó el agendamiento. Por favor revisar su calendario";
          this.getAgenda(actividad, mensaje);
          return;
        }
        this._ejecutar_actividad(actividad);
        break;
      case 5:
        this.mensajeService.alertInfo("¡Importante!", "La mesa de servicio se contactará contigo para agendar tu mentoría");
        break;
      case 10:
        let mensaje = "Esta actividad se completará cuando realice la reunión con el Asistente Técnico asignado";
        this.getAgenda(actividad, mensaje);
        return;
      case 11:
        this._ejecutar_actividad(actividad);
        break;
      case 12:
        if(this.programaService.actividad_selecionada.estado_actividad_inscripcion == 'IN'){
          this.actividadTaller.show();
          this.cod_referencia = this.actividad_seleccionada.cod_referencia;
        }else{
          this.agendaService.getAgenda(this.programaService.actividad_selecionada.id_agenda).subscribe(data=>{
            if(data.codigo == '1'){
              this.mensajeService.alertOK(null, 'Estás registrado al taller ' + data.data.tema + ' el día ' + data.data.fecha + ' a las ' + data.data.hora_inicio);
            }else{
              this._ejecutar_actividad(actividad);
            }
          });
        }
        break;
      default :
        this._ejecutar_actividad(actividad);
        //this.mensajeService.alertInfo("Esta opción se habilitará muy pronto");
        break;
    }
  }

  cod_referencia;

  private getAgenda(actividad, mensaje){
    this.agendaService.getAgenda(actividad.id_agenda, actividad.id_actividad_inscripcion).subscribe(
      data=>{
        if(data.codigo == '1'){
          let dir = "";
          if(data.data.id_tipo_asistencia == 1){
            dir = " Lugar: " +  data.data.lugar;
          }
          mensaje = "Asistencia técnica agendada el "+data.data.fechaTexto+" con "+data.data.nombre2+" a las "+data.data.hora_inicio+". Modalidad: " + data.data.tipo_asistencia + dir;
        }
        this.mensajeService.alertInfo(null,mensaje);
      }
    );
  }

  private _ejecutar_actividad(actividad): void{
    switch (actividad.id_tipo_ejecucion) {
      case 1:
        this.limpiarModal();
        this.cargarComponent(this.programaService.actividad_selecionada.componente,this.cuerpoActividad);
        this.openModal();
        break;
      case 2:
        this.limpiarModal();
        if (actividad.url_actividad_inscripcion) {
          $('#cuerpoActividad').html('<iframe style="width: 100%; height: 250px" src="' + actividad.url_actividad_inscripcion + '" frameborder="0" ' +
                  'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        }
        else
          $('#cuerpoActividad').html("No se encuentra configurado el link");
        this.openModal();
        break;
      case 6:
        this.limpiarModal();
        this.cargarComponent('SubirArchivoComponent',this.cuerpoActividad);
        this.openModal();
        break;
      case 7:
        this.router.navigate([actividad.url_actividad_inscripcion]);
        break;
      case 8:
        window.open(actividad.url_actividad_inscripcion, '_blank');
        this._actualizar_actividad();
        break;
      case 9:
        this.mensajeService.alertInfo('Esta actividad la aprueba Mesa de servicio');
        break;
      default :
        this.mensajeService.alertInfo("Esta opción se habilitará muy pronto");
        break;
    }
  }

  limpiarModal(): void{
    $('#cuerpoActividad').children().remove();
    this.removeComponent(this.cuerpoActividad);
  }

  openModal(): void{
    $('#tituloActividad').text(this.programaService.actividad_selecionada.actividad);
    this.actividadModal.show();
    if(this.programaService.actividad_selecionada.boton_finalizar =='SI'){
      this.btn_grabarFinalizar = true;
    }else{
      this.btn_grabarFinalizar = false;
      this.actividadModal.hideFooter = true;
    }
    if(this.programaService.actividad_selecionada.boton_guardar =='SI'){
      this.btn_grabar = true;
    }else{
      this.btn_grabar = false;
    }
    if(!this.btn_grabarFinalizar && !this.btn_grabar)
      this.actividadModal.hideFooter = true;
    else
      this.actividadModal.hideFooter = false;
  }

  setValuesRespuesta(data){
    if(data.data){
      if(data.data.id_evaluacion)
        this.programaService.actividad_selecionada.id_evaluacion = data.data.id_evaluacion;
    }
  }

  private procesarActividad():Observable<any>{
    if(this.componentRef){
      // este metodo debe estar en todos los componentes que se visualicen el el panel
      if(this.componentRef.instance.grabar){
        return this.componentRef.instance.grabar().pipe(
          tap(data=>{
              this.setValuesRespuesta(data);
          })
        );
      }
    }
    return of({codigo:"1"});
  }

  finalizar_actividad(): void{
    if(this.componentRef){
      // este metodo debe estar en todos los componentes que se visualicen el el panel
      if(this.componentRef.instance.finalizar){
        this.componentRef.instance.finalizar().pipe(
          tap(data=>{
              this.setValuesRespuesta(data);
          })
        ).subscribe(data=>{
          if(data.codigo == '1'){
            this._finalizar_actividad();
          }else{
            this.mensajeService.alertError(null, data.mensaje);
          }
        });
      }else{
        this._finalizar_actividad();
      }
    }
  }

  actualizar_actividad(): void{
    this.procesarActividad().subscribe(data=>{
      if(data.codigo == '1'){
        this._actualizar_actividad();
      }
    });
  }

  private _finalizar_actividad(): void{
    this.programaService.finalizar_actividad().subscribe();
  }

  private _actualizar_actividad(): void{
    this.programaService.actividad_selecionada.estado_actividad_inscripcion="EP";
    this.programaService.actualizar_actividad().subscribe(data=>{
      if(data.codigo == '1'){
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  }

  actualizar_inscripcion(): void{

  }

  components = [];

  addComponent(componentClass: Type<any>, contenedor: ViewContainerRef) {
    if(this.componentRef)
      this.componentRef.destroy();
    contenedor.clear();
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    this.componentRef = contenedor.createComponent(componentFactory);

    // Push the component so that we can keep track of which components are created
    //this.components.push(component);
  }

  removeComponent(contenedor: ViewContainerRef) {
    contenedor.clear();
  }

  cargarComponent(name, contenedor: ViewContainerRef){
    switch(name){
      case 'ModalFase1Component': 
        this.agregarModalFase1(contenedor);
        break;
      case 'ModalFase3Component': 
        this.agregarModalFase3(contenedor);
        break;
      case 'SubirArchivoComponent': 
        this.agregarModalSubirArchivo(contenedor);
        break;
      case 'ModalIntroductorioComponent': 
        this.agregarModalIntroductorio(contenedor);
        break;
      default: this.mensajeService.alertError(null,'No se encuentra configurado el componente'); break;
    }
  }

  async agregarModalIntroductorio(contenedor: ViewContainerRef) {
    const { ModalIntroductorioComponent } = await import('src/app/componente/formularios/modalIntroductorio/modalIntroductorio.component');
    this.addComponent(ModalIntroductorioComponent, contenedor);
  }

  async agregarModalFase1(contenedor: ViewContainerRef) {
    const { ModalFase1Component } = await import('src/app/componente/formularios/modalFase1/modalFase1.component');
    this.addComponent(ModalFase1Component, contenedor);
  }

  async agregarModalFase3(contenedor: ViewContainerRef) {
    const { ModalFase3Component } = await import('src/app/componente/formularios/modalFase3/modalFase3.component');
    this.addComponent(ModalFase3Component, contenedor);
  }

  async agregarModalSubirArchivo(contenedor: ViewContainerRef) {
    const { SubirArchivoComponent } = await import('src/app/componente/formularios/subirArchivo/subirArchivo.component');
    this.addComponent(SubirArchivoComponent, contenedor);
  }

  setAgenda(agenda){
    if(agenda.id_agenda){
      this.programaService.actividad_selecionada.id_agenda = agenda.id_agenda;
      this.actualizar_actividad();
    }
  }

  /*async agregarEvaluacionComponent(contenedor: ViewContainerRef) {
    const { RubricaComponent } = await import('src/app/paginas/rubrica/rubrica.component');
    this.addComponent(RubricaComponent, contenedor);
    this.componentRef.instance.id_rubrica=this.programaService.actividad_selecionada.id_rubrica;
    this.componentRef.instance.id_evaluacion=this.programaService.actividad_selecionada.id_evaluacion;
    this.componentRef.instance.id_persona=this.programaService.programa_selecionada.sub_programa.id_persona;
    this.componentRef.instance.id_emprendedor=this.programaService.programa_selecionada.sub_programa.id_emprendedor;
    this.componentRef.instance.id_emprendimiento=this.programaService.programa_selecionada.sub_programa.id_emprendimiento;
    this.componentRef.instance.mostrarCalificacion=false;
    this.componentRef.instance.hideHeader=true;
    this.componentRef.instance.opciones=false;
  }*/

  cancelarTaller(){
    this.actividadTaller.hide(); 
    this.cod_referencia=null;
  }
}



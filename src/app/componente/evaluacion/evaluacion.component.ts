import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Rubrica, CalificacionPregunta, PreguntaCriterio, RubricaCriterio } from 'src/app/estructuras/Rubrica';
import { RubricaService } from 'src/app/servicio/Rubrica.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Evaluacion, EvaluacionCriterio, EvaluacionDetalle } from 'src/app/estructuras/Evaluacion';
import { EvaluacionService } from 'src/app/servicio/Evaluacion.service';
import { Observable, of } from 'rxjs';
import { General } from 'src/app/estructuras/General';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit, AfterViewInit {

  @Output() evaluacion = new EventEmitter<Evaluacion>();
  @Output() finalizarEvaluacion = new EventEmitter<Evaluacion>();
  @Output() guardarEvaluacion = new EventEmitter<Evaluacion>();
  @Output() salirEvaluacion = new EventEmitter<Evaluacion>();

  

  didVote = false;

  @Input() titulo = "Rubrica";
  @Input() mostrarCalificacion = true;
  rubrica: Rubrica;
  _evaluacion: Evaluacion;
  @Input() id_rubrica: number;
  @Input() id_evaluacion: number;
  @Input() id_persona: number;
  @Input() id_emprendedor: number;
  @Input() id_emprendimiento: number;
  @Input() id_asistencia_tecnica: number;
  @Input() id_mentor: number;
  @Input() id_reunion: number;
  @Input() id_evaluador: number;
  @Input() id_usuario_evaluador: number;

  @Input() hideGrabar = false;
  @Input() hideFinalizar = false;
  @Input() hideHeader=false;
  @Input() opciones=true;

  @ViewChild('formPregunta', { static: false }) private formPregunta;

  formEvaluacion;

  constructor(
    private rubricaService: RubricaService,
    private mensajeService: MensajeService,
    private evaluacionService: EvaluacionService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    if(!this._evaluacion){
      this.consultaRubricaEvaluacion();
      this.consultarEvaluacion();
    }
  }

  consultaRubricaEvaluacion(): void {
    if(!this.id_rubrica){
      this.mensajeService.alertError(null,'No se ha configurado la rubrica');
      return;
    }
    this.rubricaService.getRubricaEvaluacion(this.id_rubrica).subscribe(data => {
      if (data.codigo == '1') {
        this.rubrica = data.data as Rubrica;
        this.indexarEvaluacion();
      } else {
        this.mensajeService.alertError(data.mensaje);
      }
    });
  }

  consultarEvaluacion(): void {
    if(!this.id_evaluacion){
      this._evaluacion = {
        criterios: []
      };
      this.indexarEvaluacion();
      return;
    }
    this.evaluacionService.getRubricaEvaluacion(this.id_evaluacion).subscribe(data => {
      if (data.codigo == '1') {
        if (data.data) {
          this._evaluacion = data.data as Evaluacion;
        } else {
          this._evaluacion = {
            criterios: []
          };
        }
        this.indexarEvaluacion();
      } else {
        this.mensajeService.alertError(data.mensaje);
      }
    });
  }

  indexarEvaluacion(): void {
    if (this._evaluacion && this.rubrica) {
      let self = this;
      if (this._evaluacion.id_evaluacion) {
        self.rubrica.criterios.forEach(function (item) {
          for (let $i = 0; $i < self._evaluacion.criterios.length; $i++) {
            if (self._evaluacion.criterios[$i].id_rubrica_criterio == item.id_rubrica_criterio) {
              item.criterio_evaluacion = self._evaluacion.criterios[$i];
              //item.calificacionM = self.evaluacion.criterios[$i].calificacion_total
              item.calificacionS = self._evaluacion.criterios[$i].calificacion_total;
              break;
            }
          }
          item.preguntas.forEach(function (pregunta) {
            for (let $i = 0; $i < item.criterio_evaluacion.detalles.length; $i++) {
              if (item.criterio_evaluacion.detalles[$i].id_rubrica_pregunta == pregunta.id_rubrica_pregunta) {
                pregunta.detalle = item.criterio_evaluacion.detalles[$i];
                //pregunta.calificacionM=item.criterio_evaluacion.detalles[$i].calificacion;
                pregunta.calificacionS = item.criterio_evaluacion.detalles[$i].calificacion;
                break;
              }
            }
          });
        });
      } else {
        this._evaluacion.id_rubrica = this.rubrica.id_rubrica;
        this._evaluacion.concepto = this.rubrica.nombre;
        this._evaluacion.id_evaluado = this.id_persona;
        this._evaluacion.id_emprendedor = this.id_emprendedor;
        this._evaluacion.id_emprendimiento = this.id_emprendimiento;
        this.rubrica.criterios.forEach(function (item) {
          var criterio: EvaluacionCriterio = {
            id_rubrica_criterio: item.id_rubrica_criterio,
            calificacion_conf: item.calificacion,
            ponderado_conf: item.ponderado,
            calificacion_total: 0,
            calificacion_pon: 0,
            detalles: []
          };
          item.calificacionS = 0;
          item.criterio_evaluacion = criterio;
          item.preguntas.forEach(function (pregunta) {
            var detalle: EvaluacionDetalle = {
              id_rubrica_pregunta: pregunta.id_rubrica_pregunta,
              calificacion_conf: pregunta.calificacion,
              ponderado_conf: pregunta.ponderado
            };
            pregunta.calificacionS = 0;
            pregunta.detalle = detalle;
            criterio.detalles.push(detalle);
          });
          self._evaluacion.criterios.push(criterio);
        });
      }
      this.evaluacion.emit(this._evaluacion);
      this.generarFormulario();
    }
  }

  calcularEvaluacion(calificacion: CalificacionPregunta, pregunta: PreguntaCriterio, criterio: RubricaCriterio, rubrica: Rubrica): void {
    let self = this._evaluacion;
    //pregunta.calificacionS = calificacion.calificacion;
    pregunta.detalle.calificacion = calificacion.calificacion;
    pregunta.detalle.id_calificacion = calificacion.id_calificacion;
    switch (rubrica.tipo) {
      case "SUMATORIA":
        self.calificacion= 0;
        self.criterios.forEach(function (item) {
          item.calificacion_total = 0;
          item.detalles.forEach(function (detalle) {
            if(!detalle.calificacion)
              detalle.calificacion=0;
            item.calificacion_total = item.calificacion_total + detalle.calificacion;
          });
          self.calificacion = self.calificacion + item.calificacion_total;
        });
        break;
      case "PROMEDIO":
        self.calificacion = 0;
        self.criterios.forEach(function (item) {
          item.calificacion_total = 0;
          item.detalles.forEach(function (detalle) {
            if(!detalle.calificacion)
              detalle.calificacion=0;
            item.calificacion_total = item.calificacion_total + detalle.calificacion;
          });
          item.calificacion_total = item.calificacion_total / item.detalles.length;
          self.calificacion = self.calificacion + item.calificacion_total;
        });
        if (self.calificacion > 0) {
          self.calificacion = self.calificacion / self.criterios.length;
        }
        break;
    }
    pregunta.calificacionS = calificacion.calificacion;
    criterio.calificacionS = criterio.criterio_evaluacion.calificacion_total;
    this.evaluacion.emit(this._evaluacion);
  }

  setEvaluacion(){
    this._evaluacion.id_evaluado = this.id_persona;
    if(this.id_emprendedor)
      this._evaluacion.id_emprendedor = this.id_emprendedor;
    if(this.id_emprendimiento)
      this._evaluacion.id_emprendimiento = this.id_emprendimiento;
    if(this.id_asistencia_tecnica)
      this._evaluacion.id_asistencia_tecnica = this.id_asistencia_tecnica;
    if(this.id_mentor)
      this._evaluacion.id_mentor = this.id_mentor;
    if(this.id_reunion)
      this._evaluacion.id_reunion = this.id_reunion;
    if(this.id_evaluador)
      this._evaluacion.id_evaluador = this.id_evaluador;
    if(this.id_usuario_evaluador)
      this._evaluacion.id_usuario_evaluador = this.id_usuario_evaluador;
  }

  grabarEvaluacion(): void{
    this.grabar().subscribe(data =>{
      if(data.codigo == '1'){
        this.mensajeService.alertEpico(null,'Evaluación grabada con éxito');
        this._evaluacion = data.data;
        this.evaluacion.emit(this._evaluacion);
        this.guardarEvaluacion.emit(this._evaluacion);
      }
    });
  }

  finalizaEvaluacion():void{
    if (!this.validarFormulario(this.formEvaluacion)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    this.grabar().subscribe(data =>{
      if(data.codigo == '1'){
        this._evaluacion = data.data;
        this.evaluacion.emit(this._evaluacion);
        //this.finalizarEvaluacion.emit(this._evaluacion);
        if(data.data.mensaje){
          Swal.fire({
            title: "Genial!",
            html: '<div>'+data.data.mensaje+'</div>',
            showCancelButton: false,
            type: 'info',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.value) {
              this.finalizarEvaluacion.emit(this._evaluacion);
            }  
          });
        }else{
          this.mensajeService.alertEpico(null,'Evaluación grabada con éxito');
          this.finalizarEvaluacion.emit(this._evaluacion);
        }
      }
    });
  }

  JSON = JSON;
  grabar():Observable<any>{
    this.setEvaluacion();
    return this.evaluacionService.grabarEvaluacion(this._evaluacion);
  }

  /* Pendiente de integrar validator*/
  finalizar():Observable<any>{
    if (!this.formPregunta.valid) {
      this.isSubmit = true;
      return of({"codigo":"0", "mensaje":"Falta seleccionar preguntas"});
    }
    this.setEvaluacion();
    return this.evaluacionService.grabarEvaluacion(this._evaluacion);
  }
  
  _finalizar(){
    this.setEvaluacion();
    this.evaluacionService.grabarEvaluacion(this._evaluacion).subscribe(data=>{
      if(data.codigo="1"){
        this._evaluacion = data.data;
        this.finalizarEvaluacion.emit(this._evaluacion);
      }else{
        this.mensajeService.alertError(null, data.mensaje);
      }
    });
  }

  salir(){
    this.salirEvaluacion.emit(this._evaluacion);
  }

  isSubmit = false;
  getValid(element): boolean {
    return General.getValidElementForm(element, this.isSubmit);
  }

  getValid2(element, disabled?): boolean {
    return General.getValidElementFormExcluyente(element, this.isSubmit, disabled);
  }

  generarFormulario(): void {
    let fields = {};
    this.formEvaluacion = this.formBuilder.group(fields);
    this.rubrica.criterios.forEach(criterio => {
      criterio.preguntas.forEach(pregunta => {
        if(pregunta.detalle.calificacion)
          fields['pregunta_' + pregunta.id_pregunta]=[pregunta.detalle.calificacion, Validators.required];
        else
          fields['pregunta_' + pregunta.id_pregunta]=['', Validators.required];
      });
    });
    this.formEvaluacion = this.formBuilder.group(fields);
  }

  validarFormulario(form?): boolean {
    if (form) {
      if (!form.valid) {
        this.isSubmit = true;
        return false;
      }
    }
    return true;
  }
}

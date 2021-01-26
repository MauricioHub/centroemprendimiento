import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';
import { WizardComponent } from 'angular-archwizard';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { EmprendimientoService } from 'src/app/servicio/Emprendimiento.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { General } from 'src/app/estructuras/General';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Emprendedor } from 'src/app/estructuras/emprendedor';
import { EmprendedorService } from 'src/app/servicio/Emprendedor.service';

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoComponent implements OnInit {

  @ViewChild(WizardComponent) private wizard: WizardComponent;
  @Output() emprendimiento = new EventEmitter<Emprendimiento>();
  @Output() emprendedor = new EventEmitter<Emprendedor>();
  @Output() finalizar = new EventEmitter<Emprendimiento>();
  @Output() grabar = new EventEmitter<Emprendimiento>();

  @Input() _emprendimiento: Emprendimiento;
  @Input() _emprendedor: Emprendedor;
  @Input() hideHeader = false;
  @Input() navigateBackward: NavigateEmprendedor = NavigateEmprendedor.ALLOW;
  @Input() navigateForward: NavigateEmprendedor = NavigateEmprendedor.ALLOW;
  @Input() id_emprendedor: number;
  @Input() id_persona: number;
  @Input() id_emprendimiento: number;
  @Input() showFinalizar = true;
  @Input() finalizado = false;

  listaEtapaEmprendimiento: any[] = [];
  listaTipoEmprendimiento: any[] = [];
  listaPersonaSocietaria: any[] = [];

  isLoad = false;
  isSubmit = false;

  formPaso1;
  formPaso2;
  formPaso3;
  formPaso4;
  formPaso5;

  constructor(
    private mensajeService: MensajeService,
    private catalogoService: CatalogoService,
    private emprendimientoService: EmprendimientoService,
    private formBuilder: FormBuilder,
    private emprendedorService: EmprendedorService
  ) {
    this.formulario1();
    this.formulario2();
    this.formulario3();
    this.formulario4();
    this.formulario5();
  }

  ngOnInit() {
    if (!this.id_emprendedor && !this.id_persona) {
      this.mensajeService.alertError('Falta parametros', 'No ha ingresado el id_persona o id_emprendedor');
      return;
    }
    if(this.id_emprendedor){
      this.emprendedorService.getEmprendedor(this.id_emprendedor).subscribe(data=>{
        if(data.data){
          this._emprendedor = data.data;
          this.id_emprendedor = this._emprendedor.id_emprendedor;
        }
        else{
          this._emprendedor = new Emprendedor();
        }
        this.emprendedor.emit(this._emprendedor);
      });
    }else{
      this.emprendedorService.getEmprendedorXidPersona(this.id_persona).subscribe(data=>{
        if(data.data){
          this._emprendedor = data.data;
          this.id_emprendedor = this._emprendedor.id_emprendedor;
        }
        else
          this._emprendedor = new Emprendedor();
        this.emprendedor.emit(this._emprendedor);
      });
    }
    if (!this._emprendimiento) {
      if (!this.id_emprendimiento) {
        this._emprendimiento = new Emprendimiento();
        this.cargarListas();
        //this.mensajeService.alertError('Falta parametros', 'No ha ingresado el emprendimiento o su id');
        //return;
      }else{
        this.emprendimientoService.getEmprendimiento(this.id_emprendimiento).subscribe(data => {
          if (data.codigo == '1') {
            this._emprendimiento = data.data;
            this.emprendimiento.emit(this._emprendimiento);
            this.cargarListas();
          }
        });
      }
    } else {
      this.cargarListas();
    }
    this.isLoad = true;
    this.catalogoService.getListaPersonaSocietaria().subscribe(data => {
      this.listaPersonaSocietaria = data.data;
    });
    this.catalogoService.getListaEtapasEmprendimientos().subscribe(data => {
      this.listaEtapaEmprendimiento = data.data;
    });
    this.catalogoService.getListaTiposEmprendimiento().subscribe(data => {
      this.listaTipoEmprendimiento = data.data;
    });

  }

  formulario1(): void {
    this.formPaso1 = this.formBuilder.group({
      nombre: ['', Validators.required],
      cant_socios: ['', Validators.required],
      etapa_emprendimiento: ['', Validators.required],
      tipo_emprendimiento: ['', Validators.required],
      numero_labora: ['', Validators.required],
      venta_mensual: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  formulario2(): void {
    this.formPaso2 = this.formBuilder.group({
      email: ['', Validators.required],
      telefono_whatsapp: new FormControl()
    });
  }

  formulario3(): void {
    this.formPaso3 = this.formBuilder.group({
      emprendimiento_formalizado: ['', Validators.required],
      desea_formalizarse: [{ disabled: true, value: '' }, Validators.required],
      persona: [{ disabled: true, value: '' }, Validators.required],
      persona_societaria: [{ disabled: true, value: '' }, Validators.required],
      opera_ruc_rise: [{ disabled: true, value: '' }, Validators.required],
      otra_persona_societaria: [{ disabled: true, value: '' }, Validators.required],
      ruc_rise: [{ disabled: true, value: '' }, Validators.required],
      nombre_comercial: [{ disabled: true, value: '' }, Validators.required],
      razon_social: [{ disabled: true, value: '' }, Validators.required]
    });
  }

  formulario4(): void {
    this.formPaso4 = this.formBuilder.group({
      cant_tipo_producto: ['', Validators.required],
      utiliza_plataforma_electronica: ['', Validators.required],
      otra_empresa: new FormControl()
    });
  }

  formulario5(): void {
    this.formPaso5 = this.formBuilder.group({
      realizado_prestado: ['', Validators.required]
    });
  }

  cargarListas(): void {
    let id_emprendimiento = this._emprendimiento.id_emprendimiento;
    if(!id_emprendimiento)
      id_emprendimiento=0;

    this.emprendimientoService.getActividadesComplementarias(id_emprendimiento).subscribe(data => {
      if (data.data) {
        this._emprendimiento.listaActividadesComplentarias = this.converSelect(data.data);
      }
    });
    this.emprendimientoService.getRedesSociales(id_emprendimiento).subscribe(data => {
      this._emprendimiento.listaRedesSociales = data.data;
    });
    this.emprendimientoService.getLugarComercializacion(id_emprendimiento).subscribe(data => {
      if (data.data) {
        this._emprendimiento.listaLugarComercializacion = this.converSelect(data.data);
      }
    });
    this.emprendimientoService.getCanalesVentas(id_emprendimiento).subscribe(data => {
      if (data.data) {
        this._emprendimiento.listaCanalVentas = this.converSelect(data.data);
        let self = this;
        this._emprendimiento.listaCanalVentas.forEach(e => {
          self.selectCanal(e);
        });
      }
    });
    this.emprendimientoService.getEmpresaDelivery(id_emprendimiento).subscribe(data => {
      if (data.data) {
        this._emprendimiento.listaEmpresaDelivery = this.converSelect(data.data);
        this._emprendimiento.listaEmpresaDelivery.forEach(e => {
          self.selectEmpresaDelivery(e);
        });
      }
    });
    let self = this;
    this.emprendimientoService.getTipoFinancimiento(id_emprendimiento).subscribe(data => {
      if (data.data) {
        self._emprendimiento.listaTipoFinancimientoConvencional = [];
        self._emprendimiento.listaTipoFinancimientoNoConvencional = [];
        data.data.forEach(function (e) {
          if (e.selected === '1')
            e.selected = true;
          else
            e.selected = false;
          if (e.tipo === 'CONVENCIONAL')
            self._emprendimiento.listaTipoFinancimientoConvencional.push(e);
          if (e.tipo === 'NO CONVENCIONAL')
            self._emprendimiento.listaTipoFinancimientoNoConvencional.push(e);
        });
      }
    });
  }

  converSelect(data) {
    data.forEach(e => {
      if (e.selected == 1)
        e.selected = true;
      else
        e.selected = false;
    });
    return data;
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

  grabarPaso1(form?): void {
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    let formData = new FormData();
    formData.append('paso', "1");
    if(!this._emprendedor.id_emprendedor){
      this._emprendedor.id_persona = this.id_persona;
      this.emprendedorService.insertar(this._emprendedor).subscribe(data=>{
        if(data.codigo == '1'){
          this._emprendedor = data.data;
          this.id_emprendedor = this._emprendedor.id_emprendedor;
          this.emprendedor.emit(this._emprendedor);
          this._grabar(formData, form);
        }
      });
    }else{
      this._grabar(formData, form);
    }
  }

  grabarPaso2(form?): void {
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    let formData = new FormData();
    formData.append('paso', "2");
    this._grabar(formData, form);
  }

  grabarPaso3(form?): void {
    this.validarFormalizacion();
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    let formData = new FormData();
    formData.append('paso', "3");
    this._grabar(formData, form);
  }

  grabarPaso4(form?): void {
    this.validarFinanciamiento();
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    let formData = new FormData();
    formData.append('paso', "4");
    this._grabar(formData, form);
  }

  grabarPaso5(form?): void {
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    let formData = new FormData();
    formData.append('paso', "5");
    this._grabar(formData, form);
  }

  grabarPasoFinal(): void {
    let formData = new FormData();
    formData.append('paso', "5");
    this.calcularPreguntas();
    this._finalizar(formData);
  }

  _grabar(formData: FormData, form?, mensaje?): void {
    if(!mensaje){
      mensaje = 'NO';
    }
    this._emprendimiento.id_emprendedor = this._emprendedor.id_emprendedor;
    this.calcularPreguntas();
    formData.append('datos', JSON.stringify(this._emprendimiento));
    this.emprendimientoService.insertarPorPasos(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        if (data.body.codigo == '0') {
          if(mensaje == 'SI')
            this.mensajeService.alertError(null, data.body.mensaje);
        } else {
          this._emprendimiento = data.body.data;
          if(mensaje == 'SI')
            this.mensajeService.alertOK(null, data.body.mensaje);
          if (form)
            this.wizard.goToNextStep();
          this.emprendimiento.emit(this._emprendimiento);
          this.grabar.emit(this._emprendimiento);
        }
      }
    });
  }

  _finalizar(formData: FormData, form?): void {
    if(!this.validarFinalizacion())
      return;
    this._emprendimiento.id_emprendedor = this._emprendedor.id_emprendedor;
    this.calcularPreguntas();
    formData.append('datos', JSON.stringify(this._emprendimiento));
    this.emprendimientoService.insertarPorPasos(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        if (data.body.codigo == '0') {
          this.mensajeService.alertError(null, data.body.mensaje);
        } else {
          this.mensajeService.alertOK(null, data.body.mensaje);
          if (form)
            this.wizard.reset();
          this.emprendimiento.emit(this._emprendimiento);
          this.finalizar.emit(this._emprendimiento);
        }
      }
    });
  }

  validarFinalizacion(): boolean {
    let total = $('.obligatorio').length;
    let cont = 0;
    let html = "<ul class='text-left' style='font-size: 13px'>";
    $('.obligatorio').each(function(e){
      if ($(this).val() != '') {
        cont++;
      } else {
        var pregunta = $(this).parent().find('label').text();
        html += '<li>' + pregunta + '</li>';
      }
    });
    html += "</ul>";
    var avance = cont / total * 100;
    this._emprendimiento.completado = avance;
    if (total == cont) {
      return true;
    } else {
      this.mensajeService.alertHTML("Te falta llenar las siguientes preguntas: ", "<div class='row justify-content-center text-center' style='padding-right: 10px;padding-left: 10px;'>"
      + html
      + "</div>");
      return false;
    }
  }

  getValid(element): boolean {
    return General.getValidElementForm(element, this.isSubmit);
  }

  getValid2(element, disabled?): boolean {
    return General.getValidElementFormExcluyente(element, this.isSubmit, disabled);
  }

  selectCanal(item) {
    if (item.id === 1) {
      if (item.selected) {
        this._emprendimiento.id_canal_venta = item.id;
      } else {
        this._emprendimiento.id_canal_venta = null;
      }
    }
  }

  selectEmpresaDelivery(item) {
    switch (item.id) {
      case 5:
        if (item.selected) {
          this._emprendimiento.id_empresa_delivery = item.id;
          this._emprendimiento.listaEmpresaDelivery.forEach(e => {
            if (e.id == 6)
              e.selected = false;
          });
        } else {
          this._emprendimiento.id_empresa_delivery = null;
        }
        break;
      case 6:
        if (item.selected) {
          let self = this;
          this._emprendimiento.listaEmpresaDelivery.forEach(e => {
            if (e.id != 6) {
              e.selected = false;
              self.selectEmpresaDelivery(e);
            }
          });
        }
        break;
      default:
        if (item.selected) {
          this._emprendimiento.listaEmpresaDelivery.forEach(e => {
            if (e.id == 6)
              e.selected = false;
          });
        }
        break;
    }
  }

  selectPersona() {
    if (this._emprendimiento.persona === 'N') {
      this._emprendimiento.id_tipo_persona_societaria = null;
      this._emprendimiento.otra_persona_societaria = null;
    }
    if (this._emprendimiento.persona === 'J') {
      this._emprendimiento.opera_ruc_rise = 'RUC';
    }
    if (this._emprendimiento.id_tipo_persona_societaria != 3) {
      this._emprendimiento.otra_persona_societaria = '';
    }
  }

  validarFormalizacion() {
    if (this._emprendimiento.emprendimiento_formalizado === 'NO') {
      this._emprendimiento.persona = '';
      this._emprendimiento.razon_social = '';
      this._emprendimiento.nombre_comercial = '';
      this._emprendimiento.ruc_rise = '';
      this._emprendimiento.opera_ruc_rise = '';
      this._emprendimiento.id_tipo_persona_societaria = null;
      this._emprendimiento.otra_persona_societaria = '';
    }
    if (this._emprendimiento.persona === 'N') {
      this._emprendimiento.id_tipo_persona_societaria = null;
      this._emprendimiento.otra_persona_societaria = '';
    }
  }

  validarFinanciamiento() {
    if (this._emprendimiento.realizado_prestado == 'NO') {
      this._emprendimiento.listaTipoFinancimientoConvencional.forEach(function (e) {
        e.selected = false;
      });
      this._emprendimiento.listaTipoFinancimientoNoConvencional.forEach(function (e) {
        e.selected = false;
      });
    }
  }

  preguntas1: number = 0;
  preguntasC1: number = 0;
  preguntasP1: number = 0;
  preguntas2: number = 0;
  preguntasC2: number = 0;
  preguntasP2: number = 0;
  preguntas3: number = 0;
  preguntasC3: number = 0;
  preguntasP3: number = 0;
  preguntas4: number = 0;
  preguntasC4: number = 0;
  preguntasP4: number = 0;
  preguntas5: number = 0;
  preguntasC5: number = 0;
  preguntasP5: number = 0;

  calcularPreguntas(): void {
    let self = this;
    this.calcular('.campoDE').subscribe(data => {
      self.preguntas1 = data.preguntas;
      self.preguntasC1 = data.preguntasC;
      self.preguntasP1 = data.preguntasP;
    });
    this.calcular('.campoRS').subscribe(data => {
      self.preguntas2 = data.preguntas;
      self.preguntasC2 = data.preguntasC;
      self.preguntasP2 = data.preguntasP;
    });
    this.calcular('.compoEF').subscribe(data => {
      self.preguntas3 = data.preguntas;
      self.preguntasC3 = data.preguntasC;
      self.preguntasP3 = data.preguntasP;
    });
    this.calcular('.campoCE').subscribe(data => {
      self.preguntas4 = data.preguntas;
      self.preguntasC4 = data.preguntasC;
      self.preguntasP4 = data.preguntasP;
    });
    if ($('.empresasDelivery').length > 0) {
      self.preguntas4 = self.preguntas4 + 3;
    }
    else
      self.preguntas4 = self.preguntas4 + 2;
    var tiene = false;
    $('.lugarComercializacion').each(function () {
      if ($(this).is(':checked'))
        tiene = true;
    });
    if (tiene)
      self.preguntasC4 = self.preguntasC4 + 1;
    tiene = false;
    $('.canalVentas').each(function () {
      if ($(this).is(':checked'))
        tiene = true;
    });
    if (tiene)
      self.preguntasC4 = self.preguntasC4 + 1;
    tiene = false;
    $('.empresasDelivery').each(function () {
      if ($(this).is(':checked'))
        tiene = true;
    });
    if (tiene)
      self.preguntasC4 = self.preguntasC4 + 1;
    self.preguntasP4 = (self.preguntasC4 / self.preguntas4) * 100;
    this.calcular('.compoFI').subscribe(data => {
      self.preguntas5 = data.preguntas;
      self.preguntasC5 = data.preguntasC;
      self.preguntasP5 = data.preguntasP;
    });
  }

  calcular(ele): Observable<any> {
    let totales = { preguntas: 0, preguntasC: 0, preguntasP: 0 };
    let total = $(ele).length;
    let cont = 0;
    $(ele).each(function () {
      if ($(this).val() != '') {
        cont++;
      }
    });
    let por = 0;
    if (cont != 0)
      por = cont / total * 100;
    totales.preguntas = total;
    totales.preguntasC = cont;
    totales.preguntasP = por;
    return of(totales);
  }
}

export enum NavigateEmprendedor {
  ALLOW = "allow",
  DENY = "deny"
}

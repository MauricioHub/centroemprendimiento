import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { General } from 'src/app/estructuras/General';
import { Persona } from 'src/app/estructuras/persona';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { PersonaService } from 'src/app/servicio/Persona.service';

@Component({
  selector: 'app-datosPersonales',
  templateUrl: './datosPersonales.component.html',
  styleUrls: ['./datosPersonales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() persona: Persona = new Persona();
  @Input() editar=false;
  @Input() id_usuario;
  @Input() id_persona;
  @Input() editable = true;

  formDatos;
  isSubmit;

  listaCiudad = [];
  listaProvincia = [];
  listaGenero = [];
  listaNivelAcademico = [];
  listaSituacionLaboral = [];
  etiquetasSeleccionadas = [];

  constructor(private catalogoService: CatalogoService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,
    private personaService: PersonaService) { }

  ngOnInit() {
    if(this.id_persona && !this.persona){
      this.personaService.getPersona(this.id_persona).subscribe(data=>{
        if(data.codigo == '1'){
          this.persona = data.data;
        }
      });
    }else{
      if(this.persona.id_provincia){
        this.consultarUbicaciones(this.persona.id_provincia);
      }
    }
    this.catalogoService.getListaGenero().subscribe(data => {
      if (data.data) {
        this.listaGenero = data.data as [];
      }
    });
    this.catalogoService.getListaNivelAcademico().subscribe(data => {
      if (data.data) {
        this.listaNivelAcademico = data.data as [];
      }
    });
    this.catalogoService.getListaSituacionLaboral().subscribe(data => {
      if (data.data) {
        this.listaSituacionLaboral = data.data as [];
      }
    });
    this.catalogoService.getUbicaciones().subscribe(data=>{
      console.log(data);
      if(data.codigo=='1'){
        this.listaProvincia = data.data;
      }
    });
    this.formularioDatos();
  }

  consultarUbicaciones(id_padre){
    this.catalogoService.getUbicaciones(null, id_padre).subscribe(data=>{
      if(data.codigo=='1'){
        this.listaCiudad = data.data;
      }
    });
  }

  formularioDatos() {
    this.formDatos = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      //identificacion: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      direccion: ['', Validators.required],
      nivel_academico: ['', Validators.required],
      situacion_laboral: ['', Validators.required]
    });
  }

  grabarPersona(form) {
    this.persona.intereses = [];
    /*this.etiquetasSeleccionadas.forEach(item => {
      this.listaEtiquetas.forEach(etiqueta => {
        if (item == etiqueta.value) {
          this.persona.intereses.push(etiqueta);
        }
      });
    });*/
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    if (!this.persona.id_persona) {
      this.persona.id_usuario = this.id_usuario;
    }
    let formData = new FormData();
    formData.append('datos', JSON.stringify(this.persona));
    this.personaService.insertarWithForm(formData).subscribe(data => {
      if (data instanceof HttpResponse) {
        if (data.body.codigo == '0') {
          this.mensajeService.alertError(null, data.body.mensaje);
        } else {
          this.mensajeService.alertOK(null, data.body.mensaje);
          this.editar = false;
        }
      }
    });
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

  getValid(element): boolean {
    return General.getValidElementForm(element, this.isSubmit);
  }

  getValid2(element, disabled?): boolean {
    return General.getValidElementFormExcluyente(element, this.isSubmit, disabled);
  }

}

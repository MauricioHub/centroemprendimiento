import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';
import { General } from 'src/app/estructuras/General';
import { Persona } from 'src/app/estructuras/persona';
import { Usuario } from 'src/app/estructuras/usuario';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { PersonaService } from 'src/app/servicio/Persona.service';

@Component({
  selector: 'app-miPerfil',
  templateUrl: './miPerfil.component.html',
  styleUrls: ['./miPerfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  formPerfil;
  isSubmit;

  @Input() persona: Persona;
  @Input() usuario: Usuario;
  @Input() id_persona;
  @Input() editar = false;
  @Input() editable = true;

  emprendimiento: Emprendimiento;

  etiquetasSeleccionadas = [];
  listaEtiquetas:IOption[];

  constructor(private catalogoService: CatalogoService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,
    private personaService: PersonaService) { }

  ngOnInit() {
    this.catalogoService.getListaEtiquetas('INTERES').subscribe(data => {
      if (data.data) {
        this.listaEtiquetas = data.data as IOption[];
      }
    });
    if (!this.usuario) {
      this.usuario = Usuario.getUser();
    }
    if (this.id_persona && !this.persona) {
      this.personaService.getPersona(this.id_persona).subscribe(data => {
        if (data.codigo == '1') {
          this.persona = data.data.persona as Persona;
          this.cargarEtiquetasSeleccionadas();
        }
      });
    }
    if(this.persona){
      this.cargarEtiquetasSeleccionadas();
    }
    this.formularioPerfil();

  }

  cargarEtiquetasSeleccionadas(){
    this.etiquetasSeleccionadas = [];
    if (this.persona.intereses) {
      this.persona.intereses.forEach(item => {
        this.etiquetasSeleccionadas.push(item.value);
      });
    }
  }

  grabarPersona(form) {
    this.persona.intereses = [];
    this.etiquetasSeleccionadas.forEach(item => {
      this.listaEtiquetas.forEach(etiqueta => {
        if (item == etiqueta.value) {
          this.persona.intereses.push(etiqueta);
        }
      });
    });
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    if (!this.persona.id_persona) {
      return;
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

  formularioPerfil() {
    this.formPerfil = this.formBuilder.group({
      frase_perfil: ['', Validators.required],
      perfil: new FormControl()
    });
  }

  getValid(element): boolean {
    return General.getValidElementForm(element, this.isSubmit);
  }

  getValid2(element, disabled?): boolean {
    return General.getValidElementFormExcluyente(element, this.isSubmit, disabled);
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

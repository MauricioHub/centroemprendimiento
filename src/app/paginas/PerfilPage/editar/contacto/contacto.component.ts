import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { General } from 'src/app/estructuras/General';
import { Persona } from 'src/app/estructuras/persona';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { PersonaService } from 'src/app/servicio/Persona.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  @Input() persona: Persona;
  @Input() id_persona;
  @Input() editar = false;
  @Input() editable = true;
  formRedes;
  isSubmit;

  constructor(private personaService: PersonaService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.id_persona && !this.persona){
      this.personaService.getPersona(this.id_persona).subscribe(data=>{
        if(data.codigo=='1'){
          this.persona = data.data;
        }
      });
    }
    this.formularioRedes();
  }

  getValid(element): boolean {
    return General.getValidElementForm(element, this.isSubmit);
  }

  getValid2(element, disabled?): boolean {
    return General.getValidElementFormExcluyente(element, this.isSubmit, disabled);
  }

  formularioRedes() {
    this.formRedes = this.formBuilder.group({
      telefono: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  grabarPersona(form) {
    if (!this.validarFormulario(form)) {
      this.mensajeService.alertError(null, 'Faltan llenar campos en el formulario');
      return;
    }
    if(!this.persona.id_persona){
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

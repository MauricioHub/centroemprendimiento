import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/estructuras/usuario';
import { Persona } from 'src/app/estructuras/persona';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit, AfterViewInit {

  @Output() setActiveTab=new EventEmitter();

  @Input() usuario: Usuario;
  @Input() activeTab: string;
  @Input() persona: Persona;
  emprendimiento: Emprendimiento;
  editar = false;

  @Input() editableDatosPersonales=true;
  @Input() editableContacto=true;
  @Input() editablePerfil=true;

  listaCiudad = [];
  listaGenero = [];
  listaNivelAcademico = [];
  listaSituacionLaboral = [];
  listaEtiquetas: IOption[];
  etiquetasSeleccionadas = [];

  formDatos;
  formRedes;
  formPerfil;
  isSubmit;

  constructor(private catalogoService: CatalogoService) {
    this.activeTab = "datos_personales";
  }

  ngOnInit() {
    if(!this.activeTab){
      this._setActiveTab("datos_personales");
    }
    if(!this.usuario){
      this.usuario = Usuario.getUser();
    }
    if(!this.persona){
      this.catalogoService.post('perfil/emprendedor').subscribe(data => {
        if (data.data) {
          this.persona = data.data.persona as Persona;
          this.etiquetasSeleccionadas = [];
          if (this.persona.intereses) {
            this.persona.intereses.forEach(item => {
              this.etiquetasSeleccionadas.push(item.value);
            });
          }
        }
        if (!this.persona.id_persona) {
          this.persona = new Persona(this.usuario);
        }
      });
    }
  }

  ngAfterViewInit() {

  }

  editarEvent() {
    this.editar = !this.editar;
  }

  _setActiveTab(tab){
    this.activeTab=tab;
    this.setActiveTab.emit(this.activeTab);
  }

}


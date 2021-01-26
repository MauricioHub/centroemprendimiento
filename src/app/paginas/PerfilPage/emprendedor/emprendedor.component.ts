import { Component, OnInit, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/estructuras/usuario';
import { Persona } from 'src/app/estructuras/persona';
import { Emprendedor } from 'src/app/estructuras/emprendedor';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';
import { General } from 'src/app/estructuras/General';
import { Inscripcion } from 'src/app/estructuras/inscripcion';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { EventoService } from 'src/app/servicio/Evento.service';
import { data } from 'jquery';

@Component({
  selector: 'app-emprendedor',
  templateUrl: './emprendedor.component.html',
  styleUrls: ['./emprendedor.component.scss']
})
export class EmprendedorComponent implements OnInit, AfterViewInit {

  /*Entidades */
  usuario:Usuario;
  @Input() persona: Persona;
  @Input() emprendedor: Emprendedor = new Emprendedor();
  @Input() emprendimiento: Emprendimiento = new Emprendimiento();
  @Input() listaEmprendimientos: Emprendimiento[];

  listaProgramasInscritos: Inscripcion[];
  actividad_selecionada = {};
  programa_selecionada = {};


  public activeTab: string;

  constructor(
    private programaService: ProgramaService,
    private eventoService: EventoService) {
    this.usuario = Usuario.getUser();
    this.activeTab = 'home';
  }

  ngOnInit() {
    this.getProgramasInscritos();
    this.consultarTalleres();
  }

  ngAfterViewInit(){
    console.log(document.querySelector('.nav-pills'));
    document.querySelector('.nav-pills').classList.add('navemp');
  }

  getId(){
    return General.generateId();
  }

  getProgramasInscritos():void{
    this.programaService.getProgramas(this.persona.id_persona).subscribe(data =>{
      if(data.codigo == '1'){
        this.listaProgramasInscritos = data.data as Inscripcion[];
        let levantarHome=false;
        this.listaProgramasInscritos.forEach(element => {
          if(!levantarHome){
            element.actividades.forEach(act => {
              if(act.id_tipo_actividad == 8 && act.estado_actividad_inscripcion == 'IN'){
                element.levantarHome = true;
                levantarHome = true;
              }
            });
            element.actividades = this.programaService.armarArbolActividades(element.actividades, null);
          }
        });
      }
    });
  }

  talleres;

  consultarTalleres(){
    console.log("Consulta Talleres");
    if(!this.persona){
      setTimeout(() => {
        this.consultarTalleres();
      }, 500);
      return;
    }
    this.eventoService.getEventos({estado:'A', id_persona:this.persona.id_persona}).subscribe(data=>{
      if(data.codigo=="1"){
        if(data.data){
          data.data.forEach(item => {
            item.stick = true;
            item.title = item.nombre;
            item.start = item.fecha + 'T'+item.hora_inicio;
            item.end = item.fecha + 'T'+item.hora_fin;
            item.url1=null;
            item.url=undefined;
          });
        }
        this.talleres = data.data;
      }
      document.querySelector('.nav-pills').classList.add('navemp');
    });
  }

  clickEvent(evento){
    console.log(evento);
  }
}

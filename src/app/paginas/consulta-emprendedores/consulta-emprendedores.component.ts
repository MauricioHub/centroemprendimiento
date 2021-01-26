import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Subject } from 'rxjs';
import { Persona } from 'src/app/estructuras/persona';
import { Usuario } from 'src/app/estructuras/usuario';
import { EmprendedorInter } from 'src/app/interfaces/Emprendedor';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { EmprendedorService } from 'src/app/servicio/Emprendedor.service';
import { EventoService } from 'src/app/servicio/Evento.service';
import { ExportService } from 'src/app/servicio/export.service';
import { MntProgramaService } from 'src/app/servicio/mantenimiento/MntPrograma.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { PersonaService } from 'src/app/servicio/Persona.service';
import { ProgramaService } from 'src/app/servicio/Programa.service';

@Component({
  selector: 'app-consulta-emprendedores',
  templateUrl: './consulta-emprendedores.component.html',
  styleUrls: ['./consulta-emprendedores.component.scss']
})
export class ConsultaEmprendedoresComponent implements OnInit, AfterViewInit, OnDestroy {
  dataTableOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  emprendedores: EmprendedorInter[];
  detalle = false;

  emprendedor: EmprendedorInter;
  persona: Persona;
  usuario: Usuario;

  paramentros: any = {
    nombre: '',
    email: '',
    nombre_emprendimiento: '',
    id_programa: 1,
    id_sub_programa: 1,
    id_etapa: '',
    id_actividad: '',
    estado_actividad: '',
    id_evento: '',
    todos: false
  };

  listaEstadoActividad;
  listaPrograma;
  listaSubPrograma;
  listaEtapa;
  listaActividad;
  listaTalleres;

  constructor(
    private emprendedorService: EmprendedorService,
    private catalogoService: CatalogoService,
    private mntProgramaService: MntProgramaService,
    private mensajeService: MensajeService,
    private personaService: PersonaService,
    private eventoService: EventoService

  ) { }

  ngOnInit() {
    this.getEmprendedores();
    this.catalogoService.getListaEstadoActividad().subscribe(data => {
      if (data.codigo == '1') {
        this.listaEstadoActividad = data.data;
      }
    });
    this.catalogoService.getListaPrograma().subscribe(data => {
      if (data.codigo == '1') {
        this.listaPrograma = data.data;
      }
    });
    this.eventoService.getEventos({id_tipo_evento: 1}).subscribe(data => {
      if (data.codigo == '1') {
        this.listaTalleres = data.data;
      }
    });
    this.consultarSubProgramas();
    this.consultarEtapas();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  consultarSubProgramas() {
    this.catalogoService.getListaSubPrograma(this.paramentros.id_programa).subscribe(data => {
      if (data.codigo == '1') {
        this.listaSubPrograma = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de sub programa');
      }
    });
  }

  consultarEtapas() {
    this.catalogoService.getEtapasXSubPrograma(this.paramentros.id_sub_programa).subscribe(data => {
      if (data.codigo == '1') {
        this.listaEtapa = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de sub programa');
      }
    });
  }

  consultarActividades() {
    this.mntProgramaService.getActividades(this.paramentros.id_etapa).subscribe(data => {
      if (data.codigo == '1') {
        this.listaActividad = data.data;
      } else {
        this.mensajeService.alertError(null, 'Error en la carga de actividades');
      }
    });
  }

  getEmprendedores(): void {
    this.emprendedorService.getEmprendedores(this.paramentros)
      .subscribe(
        data => {
          this.emprendedores = data.data
          //this.dtTrigger.next();
          this.rerender();
        }
      );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //dtInstance.clear().draw();
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  selectEmprendedor(emprendedor): void {
    this.emprendedor = emprendedor;
    this.usuario = new Usuario(this.emprendedor);
    this.personaService.getPersona(this.emprendedor.id_persona).subscribe(data => {
      if (data.codigo == '1') {
        this.persona = data.data;
      }
    });
    this.detalle = true;
  }

  public pictNotLoading(event) { event.target.src = 'images/user.png'; }
}

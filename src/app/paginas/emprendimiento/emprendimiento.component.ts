import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Emprendimiento } from 'src/app/estructuras/emprendimiento';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { Router } from '@angular/router';
import { Actividad_inscripcion } from 'src/app/estructuras/inscripcion';
import { Emprendedor } from 'src/app/estructuras/emprendedor';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-emprendimiento-page',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoPageComponent implements OnInit, AfterViewInit {

  @ViewChild('emprendimientoComponent', { static: false }) private emprendimientoComponent;

  actividad_seleccionada:Actividad_inscripcion;
  emprendimiento:Emprendimiento;
  emprendedor: Emprendedor;
  id_emprendimiento: number;
  id_emprendedor: number;
  id_persona: number;
  id_sub_programa;
  fase;

  constructor(
    private mensajeService: MensajeService,
    private programaService: ProgramaService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.actividad_seleccionada = this.programaService.actividad_selecionada;
    if(!this.programaService.programa_selecionada){
      this.router.navigate([environment.home]);
      return;
    }
    this.id_emprendimiento = this.programaService.programa_selecionada.sub_programa.id_emprendimiento;
    this.id_emprendedor = this.programaService.programa_selecionada.sub_programa.id_emprendedor;
    this.id_persona = this.programaService.programa_selecionada.sub_programa.id_persona;
    this.id_sub_programa = this.programaService.programa_selecionada.sub_programa.id_sub_programa;
    this.fase=this.programaService.actividad_selecionada.id_etapa;
  }

  ngAfterViewInit(){
    
  }
  
  setEmprendimiento(emprendimiento: Emprendimiento):void{
    this.emprendimiento = emprendimiento;
  }

  setEmprendedor(emprendedor: Emprendedor):void{
    this.emprendedor = emprendedor;
  }

  finalizarActividad(emprendimiento: Emprendimiento):void{
    this.emprendimiento = emprendimiento;
    this.programaService.programa_selecionada.sub_programa.id_emprendimiento = this.emprendimiento.id_emprendimiento;
    this.programaService.programa_selecionada.sub_programa.id_emprendedor = this.emprendedor.id_emprendedor;
    this.programaService.finalizar_actividad(environment.pathActividad+this.id_sub_programa+'/'+this.fase).subscribe();
  }
  actualizarActividad(emprendimiento: Emprendimiento):void{
    this.emprendimiento = emprendimiento;
    this.programaService.actividad_selecionada.estado_actividad_inscripcion = 'EP';
    this.programaService.programa_selecionada.sub_programa.id_emprendimiento = this.emprendimiento.id_emprendimiento;
    this.programaService.programa_selecionada.sub_programa.id_emprendedor = this.emprendedor.id_emprendedor;
    this.programaService.actualizar_inscripcion().subscribe(data =>{
      if(data.codigo == '1'){
        this.programaService.actualizar_actividad().subscribe();
      }else{
        this.mensajeService.alertError('Error al actualizar',data.mensaje);
      }
    });
  }
}



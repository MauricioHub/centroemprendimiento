import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evaluacionPage',
  templateUrl: './evaluacionPage.component.html',
  styleUrls: ['./evaluacionPage.component.scss']
})
export class EvaluacionPageComponent implements OnInit {

  id_rubrica;
  id_evaluacion;
  id_persona;
  id_emprendedor;
  id_emprendimiento;
  mostrarCalificacion=false;
  hideHeader=false;
  hideFinalizar=false;
  hideGrabar=false;
  opciones=true;
  evaluacion;
  id_sub_programa;
  fase;

  constructor(private programaService: ProgramaService,
    private router: Router) {
  }

  ngOnInit() {
    this.load();
  }

  load(){
    if(!this.programaService.programa_selecionada){
      this.router.navigate([environment.home]);
      return;
    }
    this.id_rubrica=this.programaService.actividad_selecionada.id_rubrica;
    this.id_evaluacion=this.programaService.actividad_selecionada.id_evaluacion;
    this.id_persona=this.programaService.programa_selecionada.sub_programa.id_persona;
    this.id_emprendedor=this.programaService.programa_selecionada.sub_programa.id_emprendedor;
    this.id_emprendimiento=this.programaService.programa_selecionada.sub_programa.id_emprendimiento;
    this.id_sub_programa = this.programaService.programa_selecionada.sub_programa.id_sub_programa;
    this.fase=this.programaService.actividad_selecionada.id_etapa;
    if(this.programaService.actividad_selecionada.estado_actividad_inscripcion == 'AP'){
      this.hideFinalizar=true;
      this.hideGrabar=true;
    }
  }

  finalizar(evaluacion){
    this.evaluacion = evaluacion;
    this.programaService.actividad_selecionada.id_evaluacion = evaluacion.id_evaluacion;
    //this.router.navigate([environment.pathActividad+data.data.sub_programa.id_sub_programa+'/'+data.data.sub_programa.fase]);
    this.programaService.finalizar_actividad(environment.pathActividad+this.id_sub_programa+'/'+this.fase).subscribe();
  }

  salir(evaluacion){
    this.router.navigate([environment.pathActividad+this.id_sub_programa+'/'+this.fase]);
  }
}

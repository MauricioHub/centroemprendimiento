import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { Inscripcion } from 'src/app/estructuras/inscripcion';

@Component({
  selector: 'app-page-tapa',
  templateUrl: './Etapa.component.html',
  styleUrls: ['./Etapa.component.scss']
})
export class EtapaPageComponent implements OnInit {

  id_sub_programa;
  fase;
  programa: Inscripcion;
  columnas=2;

  constructor(private rutaActiva: ActivatedRoute,
    private router: Router,
    private programaService: ProgramaService,
    private mensajeService: MensajeService) { 
  }

  ngOnInit() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id_sub_programa= params.sub_programa;
        this.fase= params.etapa;
        this.load();
      }
    );
  }

  load(){
    this.programa = null;
    if(!this.id_sub_programa || !this.fase){
      this.mensajeService.alertError('Error de carga','La pagina no se pudo mostrar');
      this.router.navigate(["/home"]);
      return;
    }
    this.programaService.getProgramaInscrito(this.id_sub_programa, this.fase).subscribe(data=>{
      if(data.codigo == '1'){
        this.programa = data.data;
        this.programa.actividades = this.programaService.armarArbolActividades(this.programa.actividades, null);
      }else{
        this.mensajeService.alertError(null,data.mensaje);
      }
    });
  }

}

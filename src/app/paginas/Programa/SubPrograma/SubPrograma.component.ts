import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/servicio/Programa.service';
import { Usuario } from 'src/app/estructuras/usuario';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-SubPrograma',
  templateUrl: './SubPrograma.component.html',
  styleUrls: ['./SubPrograma.component.scss']
})
export class SubProgramaComponent implements OnInit {

  usuario;
  id_sub_programa;
  programa;
  
  constructor(private programaService: ProgramaService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private mensajeService: MensajeService) { }

  ngOnInit() {
    this.usuario = Usuario.getUser();
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id_sub_programa= params.sub_programa;
        this.load();
      }
    );
  }

  load(){
    if(!this.id_sub_programa){
      this.mensajeService.alertError('Error de carga','La pagina no se pudo mostrar');
      this.router.navigate(["/home"]);
      return;
    }
    this.programaService.getProgramaInscrito(this.id_sub_programa, null).subscribe(data=>{
      if(data.codigo == '1'){
        this.programa = data.data;
      }else{
        this.mensajeService.alertError(null,data.mensaje);
      }
    });
  }

  openEtapa(etapa){
    this.router.navigate([environment.pathActividad+this.id_sub_programa+'/'+etapa.id_etapa]);
  }

}

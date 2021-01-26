import { Component, OnInit, Input } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { ExportService } from 'src/app/servicio/export.service';
import { PersonaService } from 'src/app/servicio/Persona.service';
import { MensajeService } from 'src/app/servicio/Mensaje.service';
import { DashboardService } from 'src/app/servicio/Dashboard.service';

@Component({
  selector: 'app-tablaActividadesDS',
  templateUrl: './tablaActividadesDS.component.html',
  styleUrls: ['./tablaActividadesDS.component.scss']
})
export class TablaActividadesDSComponent implements OnInit {

  listaActividad: any[]=[];
  listaEtapas: any[]=[];
  id_etapa=1;
  @Input() id_sub_programa;

  constructor(private dashboardService: DashboardService,
    private catalogoService: CatalogoService,
    private exportService: ExportService,
    private personaService: PersonaService,
    private mensajeService: MensajeService) {

  }

  ngOnInit() {
    this.catalogoService.getEtapasXSubPrograma(this.id_sub_programa).subscribe(data=>{
      if(data.codigo == '1'){
        this.listaEtapas = data.data;
      }
    });
    this.consultarIndicadoresFase();
  }

  consultarIndicadoresFase(){
    this.dashboardService.getIndicadoresXEtapa(this.id_etapa).subscribe(data => {
      if(data.codigo == '1'){
        this.listaActividad = data.data;
      }
    });
  }

  descargar(tipo, param?){
    switch(tipo){
      case 'ACTIVIDAD_ETAPA': this.exportService.exportAsExcelFile(this.listaActividad, 'indicadores'); break;
      case 'PERSONAS_ACTIVIDAD':
        this.personaService.getPersonasxActividad(param.id, 'TODOS').subscribe(data=>{
          if(data.codigo == '1'){
            this.exportService.exportAsExcelFile(data.data, 'actividades'); 
          }else{
            this.mensajeService.alertError(null, data.mensaje);
          }
        });
        break;
      case 'PERSONAS_ACTIVIDAD_ASIGNADO':
        this.personaService.getPersonasxActividad(param.id, 'ASIGNADOS').subscribe(data=>{
          if(data.codigo == '1'){
            this.exportService.exportAsExcelFile(data.data, 'actividades'); 
          }else{
            this.mensajeService.alertError(null, data.mensaje);
          }
        });
        break;
      case 'PERSONAS_ACTIVIDAD_NOASIGNADO':
          this.personaService.getPersonasxActividad(param.id, 'NOASIGNADOS').subscribe(data=>{
            if(data.codigo == '1'){
              this.exportService.exportAsExcelFile(data.data, 'actividades'); 
            }else{
              this.mensajeService.alertError(null, data.mensaje);
            }
          });
          break;
      default:
        this.mensajeService.alertInfo(null,'No se encuentra configurado la descarga');
        break;
    }
  }
}

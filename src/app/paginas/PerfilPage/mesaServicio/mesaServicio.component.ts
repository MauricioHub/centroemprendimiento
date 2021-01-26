import { Component, OnInit, Input } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Usuario } from 'src/app/estructuras/usuario';
import { CatalogoService } from 'src/app/servicio/catalogo.service';

@Component({
  selector: 'app-mesaServicio',
  templateUrl: './mesaServicio.component.html',
  styleUrls: ['./mesaServicio.component.css']
})
export class MesaServicioComponent implements OnInit {

  usuario:Usuario;
  @Input() persona;
  calendarAgenda: EventInput[];
  public activeTab: string;
  constructor(private catalogoService: CatalogoService) {
    this.usuario = Usuario.getUser();
    this.activeTab = 'gallery';
   }

  ngOnInit() {
  }

  cargarAgenda(): void {
    this.catalogoService.post('agenda/agendaPersonal', {id_persona:this.persona.id_persona}).subscribe(data => {
      if(data.data instanceof Array){
        this.calendarAgenda = data.data as EventInput[];
      }
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/estructuras/usuario';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-asistenciaTecnica',
  templateUrl: './asistenciaTecnica.component.html',
  styleUrls: ['./asistenciaTecnica.component.css']
})
export class AsistenciaTecnicaComponent implements OnInit {

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

}

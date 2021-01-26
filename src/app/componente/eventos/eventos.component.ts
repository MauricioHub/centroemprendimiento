import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { EventInput } from '@fullcalendar/core';
import { formatDate } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import listView from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { General } from 'src/app/estructuras/General';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  notSupported = false;

  @Output() clickEvent = new EventEmitter<any>();
  
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listView];
  calendarWeekends = true;
  @Input() calendarEvents: EventInput[];
  calendarAgenda: EventInput[];

  public fechaActual = General.getFechaActual();
  
  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    const isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIE) {
      this.notSupported = true;
    }
    if(!this.calendarEvents){
      this.catalogoService.getEventosEpico().subscribe(data => {
        if(data.data instanceof Array){
          this.calendarEvents = data.data as EventInput[];
        }
      });
    }
  }

  eventClick(event){
    this.clickEvent.emit(event);
    if(event.event.extendedProps.url1){
      window.open(event.event.extendedProps.url1, "_blanck");
    }
    return false;
  }

}

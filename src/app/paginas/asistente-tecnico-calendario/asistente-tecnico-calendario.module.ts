import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AsistenteTecnicoCalendarioRoutingModule } from './asistente-tecnico-calendario-routing.module';
import { AsistenteTecnicoCalendarioComponent } from './asistente-tecnico-calendario.component';
import {FormsModule} from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ArchivoModule } from 'src/app/componente/archivo/archivo.module';
import { TodoTemplateComponent } from './todo-template.component';
import { Globals } from './Globals';

@NgModule({
  declarations: [AsistenteTecnicoCalendarioComponent, TodoTemplateComponent],
  imports: [
    CommonModule,
    AsistenteTecnicoCalendarioRoutingModule,
    SharedModule,
    FormsModule,
    FullCalendarModule,
    NgbDropdownModule,
    ArchivoModule
  ],
  providers:[
    DatePipe,
    Globals
  ],
  exports:[AsistenteTecnicoCalendarioComponent, TodoTemplateComponent] 
})
export class AsistenteTecnicoCalendarioModule { }

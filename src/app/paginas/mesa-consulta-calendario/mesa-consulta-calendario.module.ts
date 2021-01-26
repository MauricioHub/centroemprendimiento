import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesaConsultaCalendarioRoutingModule } from './mesa-consulta-calendario-routing.module';
import { MesaConsultaCalendarioComponent } from './mesa-consulta-calendario.component';
import {FormsModule} from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [MesaConsultaCalendarioComponent],
  imports: [
    CommonModule,
    MesaConsultaCalendarioRoutingModule,
    SharedModule,
    FormsModule,
    FullCalendarModule,
    NgbDropdownModule
  ],
  exports: [MesaConsultaCalendarioComponent]
})
export class MesaConsultaCalendarioModule { }
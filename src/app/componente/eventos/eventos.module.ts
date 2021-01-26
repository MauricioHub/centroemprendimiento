import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular'
import { EventosComponent } from './eventos.component';

@NgModule({
  declarations: [EventosComponent],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule
  ],
  exports:[EventosComponent]
})
export class EventosModule { }

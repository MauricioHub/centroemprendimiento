import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendarComponent } from './agendar.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FullCalendarModule} from '@fullcalendar/angular'


@NgModule({
  declarations: [AgendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule
  ],
  exports:[AgendarComponent],
  providers: []
})
export class AgendarModule { }
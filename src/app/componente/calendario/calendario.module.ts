import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarioComponent } from './calendario.component';

@NgModule({
  declarations: [CalendarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    FullCalendarModule
  ],
  exports:[CalendarioComponent]
})
export class CalendarioModule { }

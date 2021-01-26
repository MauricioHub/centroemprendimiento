import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaPageATRoutes } from './agendaPageAT.routing';
import { AgendarPageATComponent } from './agendarPageAT.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { AgendarModule } from 'src/app/componente/agendar/agendar.module';

@NgModule({
  declarations: [AgendarPageATComponent],
  imports: [
    CommonModule,
    AgendaPageATRoutes,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    AgendarModule
  ],
  exports:[AgendarPageATComponent]
})
export class AgendaPAgeATModule { }

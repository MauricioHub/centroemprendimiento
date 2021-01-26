import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtapaPageRoutes } from './etapa.routing';
import { EtapaPageComponent } from './Etapa.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { EtapaModule } from 'src/app/componente/etapa/etapa.module';

@NgModule({
  declarations: [EtapaPageComponent],
  imports: [
    CommonModule,
    EtapaPageRoutes,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    EtapaModule
  ],
  exports:[EtapaPageComponent]
})
export class EtapaPageModule { }
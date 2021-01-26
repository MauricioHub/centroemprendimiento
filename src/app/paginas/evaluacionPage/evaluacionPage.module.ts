import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionPageRoutes } from './evaluacionPage.routing';
import { EvaluacionPageComponent } from './evaluacionPage.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { EvaluacionModule } from 'src/app/componente/evaluacion/evaluacion.module';

@NgModule({
  declarations: [EvaluacionPageComponent],
  imports: [
    CommonModule,
    EvaluacionPageRoutes,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    EvaluacionModule
  ],
  exports:[EvaluacionPageComponent]
})
export class EvaluacionPageModule { }
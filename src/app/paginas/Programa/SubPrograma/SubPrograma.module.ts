import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProgramaRoutes } from './SubPrograma.routing';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { SubProgramaComponent } from './SubPrograma.component';

@NgModule({
  declarations: [SubProgramaComponent],
  imports: [
    CommonModule,
    SubProgramaRoutes,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule
  ]
})
export class SubProgramaModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprendimientoRoutes } from './emprendimiento.routing';
import { EmprendimientoPageComponent } from './emprendimiento.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { EmprendimientoModule } from 'src/app/componente/emprendimiento/emprendimiento.module';

@NgModule({
  declarations: [EmprendimientoPageComponent],
  imports: [
    CommonModule,
    EmprendimientoRoutes,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    EmprendimientoModule
  ],
  exports:[EmprendimientoPageComponent]
})
export class EmprendimientoPageModule { }
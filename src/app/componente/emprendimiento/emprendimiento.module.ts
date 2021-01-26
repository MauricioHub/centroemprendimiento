import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmprendimientoComponent } from './emprendimiento.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EmprendimientoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArchwizardModule,
    NgbProgressbarModule
  ],
  exports:[EmprendimientoComponent],
  providers: []
})
export class EmprendimientoModule { }
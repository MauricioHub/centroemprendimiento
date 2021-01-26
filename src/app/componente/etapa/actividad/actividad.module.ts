import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadComponent } from './actividad.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ActividadComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  exports:[ActividadComponent],
  providers: []
})
export class ActividadModule { }
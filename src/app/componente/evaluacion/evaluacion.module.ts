import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionComponent } from './evaluacion.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [EvaluacionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[EvaluacionComponent],
  providers: []
})
export class EvaluacionModule { }
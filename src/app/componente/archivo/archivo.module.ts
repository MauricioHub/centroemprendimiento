import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivoComponent } from './archivo.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ArchivoComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ArchivoComponent],
  providers: []
})
export class ArchivoModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ExportarComponent } from './exportar.component';

@NgModule({
  declarations: [ExportarComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ExportarComponent]
})
export class ExportarModule { }

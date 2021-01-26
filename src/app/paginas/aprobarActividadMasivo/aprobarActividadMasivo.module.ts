import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AprobarActividadMasivoRoutes } from './aprobarActividadMasivo.routing';
import { AprobarActividadMasivoComponent } from './aprobarActividadMasivo.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ArchivoModule } from 'src/app/componente/archivo/archivo.module';
import { CargarExcelModule } from 'src/app/componente/cargarExcel/cargarExcel.module';

@NgModule({
  declarations: [AprobarActividadMasivoComponent],
  imports: [
    CommonModule,
    AprobarActividadMasivoRoutes,
    SharedModule,
    ArchivoModule,
    CargarExcelModule
  ],
  exports:[AprobarActividadMasivoComponent]
})
export class AprobarActividadMasivoModule { }

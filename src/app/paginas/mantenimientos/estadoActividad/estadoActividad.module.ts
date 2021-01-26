import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GeneralModule } from '../general/general.module';
import { EstadoActividadComponent } from './estadoActividad.component';
import { EstadoActividadRoutes } from './estadoActividad.routing';

@NgModule({
  declarations: [EstadoActividadComponent],
  imports: [
    CommonModule,
    SharedModule,
    EstadoActividadRoutes,
    GeneralModule
  ],
  exports:[EstadoActividadComponent]
})
export class EstadoActividadModule {
}

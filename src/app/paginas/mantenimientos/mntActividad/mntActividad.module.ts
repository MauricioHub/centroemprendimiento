
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { GeneralModule } from '../general/general.module';
import { MntActividadComponent } from './mntActividad.component';
import { MntActividadRoutes } from './mntActividad.routing';
import { MntActividadEditModule } from './mntActividadEdit/mntActividadEdit.module';

@NgModule({
  declarations: [MntActividadComponent],
  imports: [
    CommonModule,
    SharedModule,
    MntActividadRoutes,
    GeneralModule,
    MntActividadEditModule
  ],
  exports:[MntActividadComponent]
})
export class MntActividadModule {
}

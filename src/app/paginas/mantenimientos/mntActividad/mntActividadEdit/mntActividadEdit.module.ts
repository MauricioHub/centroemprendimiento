
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MntActividadEditComponent } from './mntActividadEdit.component';
import { ArchivoModule } from 'src/app/componente/archivo/archivo.module';
import {SelectModule} from 'ng-select';
import { EventoModule } from '../../mntEvento/evento/evento.module';

@NgModule({
  declarations: [MntActividadEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArchivoModule,
    SelectModule,
    EventoModule
  ],
  exports:[MntActividadEditComponent]
})
export class MntActividadEditModule {
}

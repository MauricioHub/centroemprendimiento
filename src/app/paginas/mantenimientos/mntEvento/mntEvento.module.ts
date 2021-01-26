import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GeneralModule } from '../general/general.module';
import {ColorPickerModule} from 'ngx-color-picker';
import { MntEventoComponent } from './mntEvento.component';
import { MntEventoRoutes } from './mntEvento.routing';
import { EventoModule } from './evento/evento.module';

@NgModule({
  declarations: [MntEventoComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    MntEventoRoutes,
    GeneralModule,
    ColorPickerModule,
    EventoModule
  ],
  exports:[MntEventoComponent]
})
export class MntEventoModule { }

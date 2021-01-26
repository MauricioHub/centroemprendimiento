import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {AmazingTimePickerModule} from 'amazing-time-picker';

import { MntAsistentesTecnicosHorarioRoutingModule } from './mnt-asistentes-tecnicos-horario-routing.module';
import { MntAsistentesTecnicosHorarioComponent } from './mnt-asistentes-tecnicos-horario.component';
import {DataTablesModule} from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [MntAsistentesTecnicosHorarioComponent],
  imports: [
    CommonModule,
    MntAsistentesTecnicosHorarioRoutingModule,
    SharedModule,
    FormsModule,
    AmazingTimePickerModule,
    DataTablesModule
  ],
  providers: []
})
export class MntAsistentesTecnicosHorarioModule { }
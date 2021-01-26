import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GeneralModule } from '../general/general.module';
import {ColorPickerModule} from 'ngx-color-picker';
import { MntPersonaComponent } from './mntPersona.component';
import { MntPersonaRoutes } from './mntPersona.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MntPersonaComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    MntPersonaRoutes,
    GeneralModule,
    ColorPickerModule,
    NgbModule
  ],
  exports:[MntPersonaComponent],
  providers: [
    DatePipe
  ]
})
export class MntPersonaModule { }

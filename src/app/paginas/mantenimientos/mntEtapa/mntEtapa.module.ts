
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { GeneralModule } from '../general/general.module';
import { MntEtapaComponent } from './mntEtapa.component';
import { MntEtapaRoutes } from './mntEtapa.routing';
import { MntEtapaEditModule } from './mntEtapaEdit/mntEtapaEdit.module';
import {DataTablesModule} from 'angular-datatables';
import { DraDropTreeModule } from 'src/app/componente/dragDropTree/draDropTree.module';

@NgModule({
  declarations: [MntEtapaComponent],
  imports: [
    CommonModule,
    SharedModule,
    MntEtapaRoutes,
    GeneralModule,
    MntEtapaEditModule,
    DataTablesModule,
    DraDropTreeModule
  ],
  exports:[MntEtapaComponent]
})
export class MntEtapaModule {
}

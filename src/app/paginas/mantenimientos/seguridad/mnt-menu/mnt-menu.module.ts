import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { MntMenuRoutes } from './mnt-menu.routing';
import { MntMenuComponent } from './mnt-menu.component';


@NgModule({
  declarations: [MntMenuComponent],
  imports: [
    CommonModule,
    MntMenuRoutes,
    SharedModule,
    DataTablesModule
  ],
  exports:[MntMenuComponent]
})
export class MntMenuModule { }

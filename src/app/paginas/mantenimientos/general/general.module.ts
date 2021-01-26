import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { GeneralComponent } from './general.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GeneralRoutes } from './general.routing';


@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    GeneralRoutes
  ],
  exports:[GeneralComponent]
})
export class GeneralModule { }

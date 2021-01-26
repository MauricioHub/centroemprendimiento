import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EtiquetasRoutes } from './etiquetas.routing';
import { EtiquetasComponent } from './etiquetas.component';
import { GeneralModule } from '../general/general.module';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [EtiquetasComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    EtiquetasRoutes,
    GeneralModule,
    ColorPickerModule
  ],
  exports:[EtiquetasComponent]
})
export class EtiquetasModule { }

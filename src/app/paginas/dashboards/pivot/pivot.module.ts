import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PivotComponent } from './pivot.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FullCalendarModule} from '@fullcalendar/angular'
import { DxChartModule, DxPivotGridModule } from 'devextreme-angular';


@NgModule({
  declarations: [PivotComponent],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule,
    DxPivotGridModule,
    DxChartModule
  ],
  exports:[PivotComponent],
  providers: []
})
export class PivotModule { }

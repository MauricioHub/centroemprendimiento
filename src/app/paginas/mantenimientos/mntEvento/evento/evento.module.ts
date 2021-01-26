import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GeneralModule } from '../../general/general.module';
import {ColorPickerModule} from 'ngx-color-picker';
import { EventoComponent } from './evento.component';


@NgModule({
  declarations: [EventoComponent],
  imports: [
    CommonModule,
    SharedModule,
    GeneralModule,
    ColorPickerModule
  ],
  exports:[EventoComponent]
})
export class EventoModule { }

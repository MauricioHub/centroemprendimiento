import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapaComponent } from './etapa.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SubirArchivoModule } from 'src/app/componente/formularios/subirArchivo/subirArchivo.module';
import { ActividadModule } from './actividad/actividad.module';
import { EventsModule } from '../events/events.module';


@NgModule({
  declarations: [EtapaComponent],
  imports: [
    CommonModule,
    SharedModule,
    SubirArchivoModule,
    ActividadModule,
    EventsModule
  ],
  exports:[EtapaComponent],
  providers: []
})
export class EtapaModule { }
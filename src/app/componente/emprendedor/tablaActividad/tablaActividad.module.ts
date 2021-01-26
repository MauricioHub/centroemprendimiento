import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaActividadComponent } from './tablaActividad.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EditarModule } from 'src/app/paginas/PerfilPage/editar/editar.module';
import {NgbAccordionModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TablaActividadComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditarModule,
    NgbAccordionModule,
    NgbCollapseModule
  ],
  exports:[TablaActividadComponent],
  providers: []
})
export class TablaActividadModule { }
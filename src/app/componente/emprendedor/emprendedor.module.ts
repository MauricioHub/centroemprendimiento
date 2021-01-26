import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmprendedorComponent } from './emprendedor.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FullCalendarModule} from '@fullcalendar/angular'
import { ActividadModule } from '../etapa/actividad/actividad.module';
import { EditarModule } from 'src/app/paginas/PerfilPage/editar/editar.module';
import { TablaActividadModule } from './tablaActividad/tablaActividad.module';
import { AsignarActividadModule } from '../asignarActividad/asignarActividad.module';
import { TreeChecklistExampleModule } from 'src/app/paginas/mantenimientos/seguridad/mnt-perfil/TreeChecklistExample/TreeChecklistExample.module';
import {ArchwizardModule} from 'angular-archwizard';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { DraDropTreeModule } from 'src/app/componente/dragDropTree/draDropTree.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [EmprendedorComponent],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule,
    EditarModule,
    ActividadModule,
    TablaActividadModule,
    AsignarActividadModule,
    TreeChecklistExampleModule,
    ArchwizardModule,
    NgbProgressbarModule,
    DraDropTreeModule,
    TreeViewModule
  ],
  exports:[EmprendedorComponent],
  providers: []
})
export class EmprendedorModule { }
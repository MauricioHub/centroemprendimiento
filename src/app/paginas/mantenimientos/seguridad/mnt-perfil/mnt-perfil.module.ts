import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { MntPerfilRoutes } from './mnt-perfil.routing';
import { MntPerfilComponent } from './mnt-perfil.component';
import { TreeChecklistExampleModule } from './TreeChecklistExample/TreeChecklistExample.module';

@NgModule({
  declarations: [MntPerfilComponent],
  imports: [
    CommonModule,
    MntPerfilRoutes,
    SharedModule,
    DataTablesModule,
    TreeChecklistExampleModule
  ],
  exports:[MntPerfilComponent]
})
export class MntPerfilModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PerfilModule } from 'src/app/componente/perfil/perfil.module';
import { PerfilHeaderModule } from '../perfilHeader/perfilHeader.module';
import { EventosModule } from 'src/app/componente/eventos/eventos.module';
import { RedEmprendedoresModule } from 'src/app/componente/redEmprendedores/redEmprendedores.module';
import { AdministradorComponent } from './administrador.component';
import { DashboardAdminModule } from '../../dashboards/dashboardAdmin/dashboardAdmin.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerfilModule,
    PerfilHeaderModule,
    EventosModule,
    RedEmprendedoresModule,
    DashboardAdminModule
  ],
  declarations: [AdministradorComponent],
  exports:[AdministradorComponent]
})
export class AdministradorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilPageRouterModule } from './PerfilPage.routing';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PerfilPageComponent } from './PerfilPage.component';
import { EmprendedorModule } from './emprendedor/emprendedor.module';
import { AsistenciaTecnicaModule } from './asistenciaTecnica/asistenciaTecnica.module';
import { MesaServicioModule } from './mesaServicio/mesaServicio.module';
import { MentorModule } from './mentor/mentor.module';
import { AdministradorModule } from './administrador/administrador.module';

@NgModule({
  declarations: [PerfilPageComponent],
  imports: [
    CommonModule,
    PerfilPageRouterModule,
    SharedModule,
    EmprendedorModule,
    AsistenciaTecnicaModule,
    MesaServicioModule,
    MentorModule,
    AdministradorModule,
    MesaServicioModule
  ],
  exports:[PerfilPageComponent]
})
export class PerfilPageModule { }

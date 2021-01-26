import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesaServicioComponent } from './mesaServicio.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PerfilModule } from 'src/app/componente/perfil/perfil.module';
import { PerfilHeaderModule } from '../perfilHeader/perfilHeader.module';
import { EventosModule } from 'src/app/componente/eventos/eventos.module';
import { RedEmprendedoresModule } from 'src/app/componente/redEmprendedores/redEmprendedores.module';
import { MesaConsultaCalendarioModule } from '../../mesa-consulta-calendario/mesa-consulta-calendario.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerfilModule,
    PerfilHeaderModule,
    EventosModule,
    RedEmprendedoresModule,
    MesaConsultaCalendarioModule
  ],
  declarations: [MesaServicioComponent],
  exports: [MesaServicioComponent]
})
export class MesaServicioModule { }

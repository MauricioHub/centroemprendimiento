import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendarModule } from './agendar/agendar.module';
import { ArchivoModule } from './archivo/archivo.module';
import { EmprendimientoModule } from './emprendimiento/emprendimiento.module';
import { EtapaModule } from './etapa/etapa.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { FotoPerfilModule } from './fotoPerfil/fotoPerfil.module';
import { PerfilModule } from './perfil/perfil.module';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EventosModule } from './eventos/eventos.module';
import { RedEmprendedoresModule } from './redEmprendedores/redEmprendedores.module';


@NgModule({
  declarations: [
  ],
  exports:[
    CommonModule,
    SharedModule,
    AgendarModule,
    ArchivoModule,
    EmprendimientoModule,
    EtapaModule,
    EvaluacionModule,
    FotoPerfilModule,
    PerfilModule,
    EventosModule,
    RedEmprendedoresModule
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgendarModule,
    ArchivoModule,
    EmprendimientoModule,
    EtapaModule,
    EvaluacionModule,
    FotoPerfilModule,
    PerfilModule,
    EventosModule,
    RedEmprendedoresModule
  ],
  providers: []
})
export class ComponentAppModule { }
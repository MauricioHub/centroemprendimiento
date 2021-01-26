import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaEmprendedoresRoutingModule } from './consulta-emprendedores-routing.module';
import { ConsultaEmprendedoresComponent } from './consulta-emprendedores.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EditarModule } from '../PerfilPage/editar/editar.module';
import { ActividadModule } from 'src/app/componente/etapa/actividad/actividad.module';
import { EmprendedorModule } from 'src/app/componente/emprendedor/emprendedor.module';
import { ExportarModule } from 'src/app/componente/exportar/exportar.module';


@NgModule({
  declarations: [ConsultaEmprendedoresComponent],
  imports: [
    CommonModule,
    ConsultaEmprendedoresRoutingModule,
    SharedModule,
    DataTablesModule,
    EditarModule,
    ActividadModule,
    EmprendedorModule,
    ExportarModule
  ]
})
export class ConsultaEmprendedoresModule { }

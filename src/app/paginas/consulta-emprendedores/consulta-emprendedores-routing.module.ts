import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultaEmprendedoresComponent} from './consulta-emprendedores.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaEmprendedoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ConsultaEmprendedoresRoutingModule {}


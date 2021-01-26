import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MesaConsultaCalendarioComponent} from './mesa-consulta-calendario.component';


const routes: Routes = [
  {
    path: '',
    component: MesaConsultaCalendarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaConsultaCalendarioRoutingModule { }






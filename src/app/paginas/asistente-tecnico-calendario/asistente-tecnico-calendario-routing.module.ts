import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AsistenteTecnicoCalendarioComponent} from './asistente-tecnico-calendario.component';

const routes: Routes = [
  {
    path: '',
    component: AsistenteTecnicoCalendarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AsistenteTecnicoCalendarioRoutingModule { }

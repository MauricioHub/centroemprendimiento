import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MntAsistentesTecnicosHorarioComponent} from './mnt-asistentes-tecnicos-horario.component';

const routes: Routes = [
  {
    path: '',
    component: MntAsistentesTecnicosHorarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MntAsistentesTecnicosHorarioRoutingModule {}


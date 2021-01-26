import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MntAsistentesTecnicosComponent} from './mnt-asistentes-tecnicos.component';

const routes: Routes = [
  {
    path: '',
    component: MntAsistentesTecnicosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MntAsistentesTecnicosRoutingModule {}

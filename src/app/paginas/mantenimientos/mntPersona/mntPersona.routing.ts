import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MntPersonaComponent } from './mntPersona.component';

const routes: Routes = [
  {
    path: '',
    component: MntPersonaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntPersonaRoutes{}

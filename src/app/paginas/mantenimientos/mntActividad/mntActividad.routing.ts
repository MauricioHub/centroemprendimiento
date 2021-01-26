import { NgModule } from '@angular/core';
import { MntActividadComponent } from './mntActividad.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MntActividadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntActividadRoutes { }

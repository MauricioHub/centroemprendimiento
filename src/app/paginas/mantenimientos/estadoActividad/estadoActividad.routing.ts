import { NgModule } from '@angular/core';
import { EstadoActividadComponent } from './estadoActividad.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EstadoActividadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoActividadRoutes {};

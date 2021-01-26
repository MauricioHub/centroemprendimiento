import { NgModule } from '@angular/core';
import { AprobarActividadMasivoComponent } from './aprobarActividadMasivo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AprobarActividadMasivoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobarActividadMasivoRoutes { }

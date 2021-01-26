import { NgModule } from '@angular/core';
import { MntPerfilComponent } from './mnt-perfil.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MntPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntPerfilRoutes { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MntEventoComponent } from './mntEvento.component';

const routes: Routes = [
  {
    path: '',
    component: MntEventoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntEventoRoutes{}

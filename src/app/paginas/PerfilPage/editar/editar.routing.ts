import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarComponent } from './editar.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    component: EditarComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarRoutingRoutes { }

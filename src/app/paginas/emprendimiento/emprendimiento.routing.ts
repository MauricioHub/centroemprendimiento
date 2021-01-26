import { Routes, RouterModule } from '@angular/router';
import { EmprendimientoPageComponent } from './emprendimiento.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:"",
    component:EmprendimientoPageComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendimientoRoutes { }

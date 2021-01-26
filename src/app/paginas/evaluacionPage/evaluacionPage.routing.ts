import { Routes, RouterModule } from '@angular/router';
import { EvaluacionPageComponent } from './evaluacionPage.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:"",
    component:EvaluacionPageComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionPageRoutes { }

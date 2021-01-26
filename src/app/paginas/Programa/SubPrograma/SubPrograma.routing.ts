import { Routes, RouterModule } from '@angular/router';
import { SubProgramaComponent } from './SubPrograma.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:"",
    component:SubProgramaComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubProgramaRoutes { }

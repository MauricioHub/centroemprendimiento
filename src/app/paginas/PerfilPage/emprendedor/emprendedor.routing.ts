import { NgModule } from '@angular/core';
import { EmprendedorComponent } from './emprendedor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmprendedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendedorRouterModule { }

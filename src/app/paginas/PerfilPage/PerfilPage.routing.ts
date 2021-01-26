import { NgModule } from '@angular/core';
import { PerfilPageComponent } from './PerfilPage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PerfilPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilPageRouterModule { }

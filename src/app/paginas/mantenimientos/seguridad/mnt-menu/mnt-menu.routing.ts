import { NgModule } from '@angular/core';
import { MntMenuComponent } from './mnt-menu.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MntMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntMenuRoutes { }

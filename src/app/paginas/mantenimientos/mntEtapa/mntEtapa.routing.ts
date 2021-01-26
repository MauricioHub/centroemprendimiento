import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MntEtapaComponent } from './mntEtapa.component';

const routes: Routes = [
  {
    path: '',
    component: MntEtapaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntEtapaRoutes { }

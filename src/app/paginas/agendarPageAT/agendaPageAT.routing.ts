import { NgModule } from '@angular/core';
import { AgendarPageATComponent } from './agendarPageAT.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AgendarPageATComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaPageATRoutes { }

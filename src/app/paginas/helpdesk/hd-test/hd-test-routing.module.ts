import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HdTestComponent} from './hd-test.component';

const routes: Routes = [
  {
    path: '',
    component: HdTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HdTestRoutingModule { }
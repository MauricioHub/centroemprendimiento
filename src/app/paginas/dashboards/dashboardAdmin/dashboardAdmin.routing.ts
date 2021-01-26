import { Routes, RouterModule } from '@angular/router';
import { DashboardAdminComponent } from './dashboardAdmin.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:"",
    component:DashboardAdminComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutes { }

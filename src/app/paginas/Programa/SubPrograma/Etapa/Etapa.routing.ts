import { Routes, RouterModule } from '@angular/router';
import { EtapaPageComponent } from './Etapa.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:"",
    component:EtapaPageComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapaPageRoutes { }

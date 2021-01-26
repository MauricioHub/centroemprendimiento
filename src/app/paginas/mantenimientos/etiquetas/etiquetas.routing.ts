import { NgModule } from '@angular/core';
import { EtiquetasComponent } from './etiquetas.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EtiquetasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtiquetasRoutes { }


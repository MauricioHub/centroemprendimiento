import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mnt-perfil',
        loadChildren: () => import('./mnt-perfil/mnt-perfil.module').then(module => module.MntPerfilModule)
      },
      {
        path: 'mnt-menu',
        loadChildren: () => import('./mnt-menu/mnt-menu.module').then(module => module.MntMenuModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntSeguridadRoutes { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mnt-seguridad',
        loadChildren: () => import('./seguridad/mnt-seguridad.module').then(module => module.MntSeguridadModule)
      },
      {
        path: 'others/etiquetas',
        loadChildren: () => import('./etiquetas/etiquetas.module')
          .then(module => module.EtiquetasModule)
      },
      {
        path: 'programas/actividad',
        loadChildren: () => import('./mntActividad/mntActividad.module')
          .then(module => module.MntActividadModule)
      },
      {
        path: 'programas/etapa',
        loadChildren: () => import('./mntEtapa/mntEtapa.module')
          .then(module => module.MntEtapaModule)
      },
      {
        path: 'others/estado_actividad',
        loadChildren: () => import('./estadoActividad/estadoActividad.module')
          .then(module => module.EstadoActividadModule)
      },
      {
        path: 'others/evento',
        loadChildren: () => import('./mntEvento/mntEvento.module')
          .then(module => module.MntEventoModule)
      },
      {
        path: 'others/persona',
        loadChildren: () => import('./mntPersona/mntPersona.module')
          .then(module => module.MntPersonaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutes { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthSigninV2Component } from './componente/auth-signin-v2/auth-signin-v2.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./paginas/PerfilPage/PerfilPage.module').then(module => module.PerfilPageModule)
      },
      {
        path: 'paginas/perfil',
        loadChildren: () => import('./paginas/PerfilPage/editar/editar.module').then(module => module.EditarModule)
      },
      {
        path: "sample-page",
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: "paginas/centro_emprendimiento/formularios/emprendimiento.php",
        loadChildren: () => import('./paginas/emprendimiento/emprendimiento.module').then(module => module.EmprendimientoPageModule)
      },
      {
        path: "paginas/centro_emprendimiento/agendarAsistenciaTecnica",
        loadChildren: () => import('./paginas/agendarPageAT/agendaPAgeAT.module').then(module => module.AgendaPAgeATModule)
      },
      {
        path: "paginas/servicios/programas/subprograma/etapa/:sub_programa/:etapa",
        loadChildren: () => import('./paginas/Programa/SubPrograma/Etapa/Etapa.module').then(module => module.EtapaPageModule)
      },
      {
        path: "paginas/servicios/programas/subprograma/:sub_programa",
        loadChildren: () => import('./paginas/Programa/SubPrograma/SubPrograma.module').then(module => module.SubProgramaModule)
      },
      {
        path: "paginas/centro_emprendimiento/evaluacion",
        loadChildren: () => import('./paginas/evaluacionPage/evaluacionPage.module').then(module => module.EvaluacionPageModule)
      },
      {
        path: "paginas/dashboardAdmin",
        loadChildren: () => import('./paginas/dashboards/dashboardAdmin/dashboardAdmin.module').then(module => module.DashboardAdminModule)
      },
      {
        path: 'mnt-asistentes-tecnicos',
        loadChildren: () => import('./paginas/mnt-asistentes-tecnicos/mnt-asistentes-tecnicos.module')
          .then(module => module.MntAsistentesTecnicosModule)
      },
      {
        path: 'mnt-asistentes-tecnicos-horario/:nombre/:id_asistencia_tecnica',
        loadChildren: () => import('./paginas/mnt-asistentes-tecnicos-horario/mnt-asistentes-tecnicos-horario.module')
          .then(module => module.MntAsistentesTecnicosHorarioModule)
      },
      {
        path: 'consulta-emprendedores',
        loadChildren: () => import('./paginas/consulta-emprendedores/consulta-emprendedores.module')
          .then(module => module.ConsultaEmprendedoresModule)
      },
      {
        path: 'asistente-tecnico-calendario',
        loadChildren: () => import('./paginas/asistente-tecnico-calendario/asistente-tecnico-calendario.module')
          .then(module => module.AsistenteTecnicoCalendarioModule)
      },
      {
        path: 'mesa-consulta-calendario',
        loadChildren: () => import('./paginas/mesa-consulta-calendario/mesa-consulta-calendario.module')
          .then(module => module.MesaConsultaCalendarioModule)
      },
      {
        path: 'mantenimiento',
        loadChildren: () => import('./paginas/mantenimientos/mantenimiento.module')
          .then(module => module.MantenimientoModule)
      },
      {
        path: 'mantenimiento/:tabla',
        loadChildren: () => import('./paginas/mantenimientos/general/general.module')
          .then(module => module.GeneralModule)
      },
      {
        path: "paginas/servicios/helpdesk",
        loadChildren: () => import('./paginas/helpdesk/helpdesk.module').then(module => module.HelpdeskModule)
      },
      {
        path: "paginas/aprobar/actividad/masivo",
        loadChildren: () => import('./paginas/aprobarActividadMasivo/aprobarActividadMasivo.module').then(module => module.AprobarActividadMasivoModule)
      },
      {
        path: "paginas/bancoinformacion",
        loadChildren: () => import('./paginas/bancoinformacion/Bancoinformacion.module').then(module => module.BancoinformacionModule)
      },
      {
        path: "paginas/chatbot",
        loadChildren: () => import('./paginas/chatbot/Chatbot.module').then(module => module.ChatbotModule)
      }
    ]
  },
  {
    path: 'ce',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'ce/auth',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'ce/ce/auth',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'ce/ce/auth/home',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthSigninV2Component,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./componente/auth-signin-v2/auth-signin-v2.module').then(module => module.AuthSigninV2Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

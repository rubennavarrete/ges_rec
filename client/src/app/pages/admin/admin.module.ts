import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from 'src/app/core/guards/session.guard';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'medicos',
        loadChildren: () =>
          import('./medicos/medicos.module').then((m) => m.MedicosModule),
          data: {
            role: 'Administrador'
          },
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
          data: {
            role: 'Administrador'
          },
      },
      {
        path: 'farmacias',
        loadChildren: () =>
          import('./farmacias/farmacias.module').then((m) => m.FarmaciasModule),
          data: {
            role: 'Administrador'
          },
      },
      {
        path: 'medicaciones',
        loadChildren: () =>
          import('./medicaciones/medicaciones.module').then(
            (m) => m.MedicacionesModule
          ),
          data: {
            role: 'Administrador'
          },
          canActivate: [SessionGuard]
      },
      {
        path: 'diagnosticos',
        loadChildren: () =>
          import('./diagnosticos/diagnosticos.module').then(
            (m) => m.DiagnosticosModule
          ),
          data: {
            role: 'Administrador'
          }
      },
      {
        path: 'recetas',
        loadChildren: () =>
          import('./recetas/recetas.module').then(
            (m) => m.RecetasModule
          ),
          data: {
            role: 'Administrador'
          },
      },
    ],
  },
];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }

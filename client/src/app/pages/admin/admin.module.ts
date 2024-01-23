import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecetasComponent } from './recetas/recetas.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'medicos',
        loadChildren: () =>
          import('./medicos/medicos.module').then((m) => m.MedicosModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'farmacias',
        loadChildren: () =>
          import('./farmacias/farmacias.module').then((m) => m.FarmaciasModule),
      },
      {
        path: 'medicaciones',
        loadChildren: () =>
          import('./medicaciones/medicaciones.module').then(
            (m) => m.MedicacionesModule
          ),
      },
      {
        path: 'diagnosticos',
        loadChildren: () =>
          import('./diagnosticos/diagnosticos.module').then(
            (m) => m.DiagnosticosModule
          ),
      },
      {
        path: 'recetas',
        loadChildren: () =>
          import('./recetas/recetas.module').then(
            (m) => m.RecetasModule
          ),
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

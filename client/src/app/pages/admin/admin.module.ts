import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmaciasComponent } from './farmacias/farmacias.component';
import { MedicosComponent } from './medicos/medicos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'medicos',
        loadChildren: () =>
        import('./medicos/medicos.module').then(
          (m) => m.MedicosModule
        )
      
      },
      {
        path:'usuarios',
        loadChildren: () =>
        import('./usuarios/usuarios.module').then(
          (m) => m.UsuariosModule
        )
      },
      {
        path:'farmacias',
        loadChildren: () =>
        import('./farmacias/farmacias.module').then(
          (m) => m.FarmaciasModule
        )
      }
    ]
  }
]

@NgModule({
  declarations: [
    // FarmaciasComponent,
    // MedicosComponent,
    // UsuariosComponent
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

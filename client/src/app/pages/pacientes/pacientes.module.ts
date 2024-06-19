import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mis_recetas',
        loadChildren: () =>
          import('./mis-recetas/mis-recetas.module').then((m) => m.MisRecetasModule),
          data: {
            role: 'Paciente'  
          },
      },
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PacientesModule { }

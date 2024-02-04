import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'recetas',
        loadChildren: () =>
          import('./lista-recetas/lista-recetas.module').then((m) => m.ListaRecetasModule),
          data: {
            role: 'Farmacia'  
          },
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FarmaciaModule { }

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
            role: 'Medico'  
          },
      },
      {
        path: 'diagnosticos',
        loadChildren: () =>
          import('./diagnostico-paciente/diagnostico-paciente.module').then((m) => m.DiagnosticoPacienteModule),
          data: {
            role: 'Medico'  
          },
      },
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./lista-pacientes/lista-pacientes.module').then((m) => m.ListaPacientesModule),
          data: {
            role: 'Medico'  
          },
      },
      {
        path: 'medicaciones',
        loadChildren: () =>
          import('./lista-medicaciones/lista-medicaciones.module').then((m) => m.ListaMedicacionesModule),
          data: {
            role: 'Medico'  
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
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class MedicosModule { }

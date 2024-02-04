import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPacientesRoutingModule } from './lista-pacientes-routing.module';
import { MedicoModule } from 'src/app/components/medicos/medico.module';
import { ListaPacientesComponent } from './lista-pacientes.component';


@NgModule({
  declarations: [ListaPacientesComponent],
  imports: [
    CommonModule,
    ListaPacientesRoutingModule,
    MedicoModule
  ],
  exports:[
    ListaPacientesComponent
  ]
})
export class ListaPacientesModule { }

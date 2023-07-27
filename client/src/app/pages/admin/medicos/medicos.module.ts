import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicoModule } from 'src/app/components/medicos/medico.module';
import { MedicosComponent } from './medicos.component';


@NgModule({
  declarations: [MedicosComponent],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    MedicoModule
  ],
  exports:[
    MedicosComponent
  ]
})
export class MedicosModule { }

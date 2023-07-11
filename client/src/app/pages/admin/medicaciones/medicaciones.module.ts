import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicacionesRoutingModule } from './medicaciones-routing.module';
import { Medicaciones1Module } from 'src/app/components/medicaciones/medicaciones.module';
import { MedicacionesComponent } from './medicaciones.component';


@NgModule({
  declarations: [MedicacionesComponent],
  imports: [
    CommonModule,
    MedicacionesRoutingModule,
    Medicaciones1Module
  ], 
  exports: [MedicacionesComponent]
})
export class MedicacionesModule { }

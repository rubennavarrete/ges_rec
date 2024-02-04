import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaMedicacionesRoutingModule } from './lista-medicaciones-routing.module';
import { Medicaciones1Module } from 'src/app/components/medicaciones/medicaciones.module';
import { ListaMedicacionesComponent } from './lista-medicaciones.component';


@NgModule({
  declarations: [ListaMedicacionesComponent],
  imports: [
    CommonModule,
    ListaMedicacionesRoutingModule,
    Medicaciones1Module
  ],
  exports: [ListaMedicacionesComponent]
})
export class ListaMedicacionesModule { }

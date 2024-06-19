import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaMedicamentosRoutingModule } from './lista-medicamentos-routing.module';
import { ListaMedicamentosComponent } from './lista-medicamentos.component';
import { Medicaciones1Module } from 'src/app/components/medicaciones/medicaciones.module';


@NgModule({
  declarations: [
    ListaMedicamentosComponent
  ],
  imports: [
    CommonModule,
    ListaMedicamentosRoutingModule,
    Medicaciones1Module
  ]
})
export class ListaMedicamentosModule { }

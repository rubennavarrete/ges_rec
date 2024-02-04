import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRecetasRoutingModule } from './lista-recetas-routing.module';
import { ListaRecetasComponent } from './lista-recetas.component';
import { DiagnosticoModule } from 'src/app/components/diagnosticos/diagnostico.module';



@NgModule({
  declarations: [ListaRecetasComponent],
  imports: [
    CommonModule,
    DiagnosticoModule,
    ListaRecetasRoutingModule,

  ],
  exports: [ListaRecetasComponent]
})
export class ListaRecetasModule { }

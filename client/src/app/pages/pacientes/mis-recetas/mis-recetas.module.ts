import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisRecetasRoutingModule } from './mis-recetas-routing.module';
import { MisRecetasComponent } from './mis-recetas.component';
import { DiagnosticoModule } from 'src/app/components/diagnosticos/diagnostico.module';


@NgModule({
  declarations: [
    MisRecetasComponent
  ],
  imports: [
    CommonModule,
    MisRecetasRoutingModule,
    DiagnosticoModule
  ],
  exports: [MisRecetasComponent]
})
export class MisRecetasModule { }

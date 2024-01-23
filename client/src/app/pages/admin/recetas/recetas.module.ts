import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasComponent } from './recetas.component';
import { DiagnosticoModule } from 'src/app/components/diagnosticos/diagnostico.module';
import { RecetasRoutingModule } from './recetas-routing.module';



@NgModule({
  declarations: [RecetasComponent],
  imports: [
    CommonModule,
    DiagnosticoModule,
    RecetasRoutingModule

  ],
  exports: [RecetasComponent]
})
export class RecetasModule { }

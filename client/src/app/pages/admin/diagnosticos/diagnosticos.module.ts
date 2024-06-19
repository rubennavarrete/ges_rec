import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DiagnosticosComponent } from './diagnosticos.component';
import { DiagnosticosRoutingModule } from './diagnosticos-routing.module';
import { DiagnosticoModule } from 'src/app/components/diagnosticos/diagnostico.module';



@NgModule({
  declarations: [DiagnosticosComponent],
  imports: [
    CommonModule,
    DiagnosticosRoutingModule,
    DiagnosticoModule
  ],
  exports: [DiagnosticosComponent]
})
export class DiagnosticosModule { }

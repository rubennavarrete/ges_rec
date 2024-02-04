import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticoPacienteRoutingModule } from './diagnostico-paciente-routing.module';
import { DiagnosticoPacienteComponent } from './diagnostico-paciente.component';
import { DiagnosticoModule } from 'src/app/components/diagnosticos/diagnostico.module';


@NgModule({
  declarations: [DiagnosticoPacienteComponent],
  imports: [
    CommonModule,
    DiagnosticoPacienteRoutingModule,
    DiagnosticoModule
  ],
  exports: [DiagnosticoPacienteComponent]
})
export class DiagnosticoPacienteModule { }

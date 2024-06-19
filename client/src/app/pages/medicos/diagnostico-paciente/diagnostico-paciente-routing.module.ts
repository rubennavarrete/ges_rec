import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticoPacienteComponent } from './diagnostico-paciente.component';

const routes: Routes = [
  {path:'', component: DiagnosticoPacienteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticoPacienteRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticosComponent } from './diagnosticos.component';


const routes: Routes = [
  {path:'', component: DiagnosticosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticosRoutingModule { }
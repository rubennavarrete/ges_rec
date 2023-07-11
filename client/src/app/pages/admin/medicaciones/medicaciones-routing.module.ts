import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicacionesComponent } from './medicaciones.component';

const routes: Routes = [
  {path:'', component: MedicacionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicacionesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMedicacionesComponent } from 'src/app/components/medicaciones/list-medicaciones/list-medicaciones.component';

const routes: Routes = [
  {path:'', component: ListMedicacionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaMedicacionesRoutingModule { }

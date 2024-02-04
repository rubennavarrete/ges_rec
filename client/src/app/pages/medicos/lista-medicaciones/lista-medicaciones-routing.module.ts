import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMedicacionesModule } from './lista-medicaciones.module';

const routes: Routes = [
  {path:'', component: ListaMedicacionesModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaMedicacionesRoutingModule { }

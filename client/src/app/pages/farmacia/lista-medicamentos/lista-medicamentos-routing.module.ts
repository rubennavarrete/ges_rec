import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMedicamentosComponent } from './lista-medicamentos.component';

const routes: Routes = [
  {path:'', component: ListaMedicamentosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaMedicamentosRoutingModule { }

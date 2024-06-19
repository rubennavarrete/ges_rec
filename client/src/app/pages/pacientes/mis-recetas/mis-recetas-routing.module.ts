import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisRecetasComponent } from './mis-recetas.component';

const routes: Routes = [
  {path:'', component: MisRecetasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisRecetasRoutingModule { }

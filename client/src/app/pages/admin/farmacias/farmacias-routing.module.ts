import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmaciasComponent } from './farmacias.component';

const routes: Routes = [
  {
    path: '', component: FarmaciasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmaciasRoutingModule { }

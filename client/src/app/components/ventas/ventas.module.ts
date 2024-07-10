import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVentasComponent } from './list-ventas/list-ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from 'src/app/shared/dashboard.module';



@NgModule({
  declarations: [
    ListVentasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardModule,
    FormsModule
  ],
  exports: [
    ListVentasComponent
  ]
})
export class VentaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVentasComponent } from './list-ventas/list-ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from 'src/app/shared/dashboard.module';
import { ViewVentaComponent } from './modals/view-venta/view-venta.component';



@NgModule({
  declarations: [
    ListVentasComponent,
    ViewVentaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardModule,
    FormsModule
  ],
  exports: [
    ListVentasComponent,
    ViewVentaComponent
  ]
})
export class VentaModule { }

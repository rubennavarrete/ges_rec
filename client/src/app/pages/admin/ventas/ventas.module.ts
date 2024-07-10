import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentaModule } from 'src/app/components/ventas/ventas.module';



@NgModule({
  declarations: [VentasComponent],
  imports: [
    CommonModule,
    VentaModule,
    VentasRoutingModule
  ],
  exports: [VentasComponent]
})
export class VentasModule { }

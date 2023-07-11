import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmaciasRoutingModule } from './farmacias-routing.module';
import { FarmModule } from 'src/app/components/farmacias/farm.module';
import { FarmaciasComponent } from './farmacias.component';


@NgModule({
  declarations: [FarmaciasComponent],
  imports: [
    CommonModule,
    FarmaciasRoutingModule,
    FarmModule
  ],
  exports:[
    FarmaciasComponent
  ]
})
export class FarmaciasModule { }

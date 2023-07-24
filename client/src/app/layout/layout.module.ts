import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//COMPONENTES
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';


//MODULOS
import { DashboardModule } from '../shared/dashboard.module';




@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    DashboardModule

  ],
  exports: [
    FullLayoutComponent,
    SimpleLayoutComponent,
  ]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404RoutingModule } from './error404-routing.module';
import { Error404Component } from './error404.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    Error404RoutingModule,
    ReactiveFormsModule
  ],
  exports: [Error404Component]
})
export class Error404Module { }

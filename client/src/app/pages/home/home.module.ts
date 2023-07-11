import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardModule } from 'src/app/shared/dashboard.module';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // DashboardModule,
    LoginModule
  ]
})
export class HomeModule { }

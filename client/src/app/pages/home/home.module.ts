import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardModule } from 'src/app/shared/dashboard.module';
import { LoginModule } from '../login/login.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // DashboardModule,
    LoginModule,
    RouterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }

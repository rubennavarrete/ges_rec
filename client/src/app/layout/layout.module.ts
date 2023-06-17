import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { LoginModule } from '../components/login/login.module';
import { SimpleHeaderComponent } from '../components/simple-header/simple-header.component';
import { SimpleMainComponent } from '../components/simple-main/simple-main.component';
import { SimpleFooterComponent } from '../components/simple-footer/simple-footer.component';


@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent,
    SimpleHeaderComponent,
    SimpleMainComponent,
    SimpleFooterComponent
  ],
  imports: [
    CommonModule,
    LoginModule
  ],
  exports: [
    FullLayoutComponent,
    SimpleLayoutComponent,
    SimpleHeaderComponent,
    SimpleMainComponent,
    SimpleFooterComponent
  ]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { LoginModule } from '../components/login/login.module';
import { SimpleHeaderComponent } from '../components/simple-header/simple-header.component';
import { SimpleMainComponent } from '../components/simple-main/simple-main.component';
import { SimpleFooterComponent } from '../components/simple-footer/simple-footer.component';
import { SimpleSidebarComponent } from '../components/simple-sidebar/simple-sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent,
    SimpleHeaderComponent,
    SimpleMainComponent,
    SimpleFooterComponent,
    SimpleSidebarComponent
    
  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule
  ],
  exports: [
    FullLayoutComponent,
    SimpleLayoutComponent,
    SimpleHeaderComponent,
    SimpleMainComponent,
    SimpleFooterComponent,
    SimpleSidebarComponent
    
  ]
})
export class LayoutModule { }

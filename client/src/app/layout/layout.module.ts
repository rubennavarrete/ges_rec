import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { LoginModule } from '../components/login/login.module';
import { SimpleHeaderComponent } from '../components/simple-header/simple-header.component';
import { SimpleFooterComponent } from '../components/simple-footer/simple-footer.component';
import { SimpleSidebarComponent } from '../components/simple-sidebar/simple-sidebar.component';
import { ListUserComponent } from '../components/list-user/list-user.component';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from '../components/usuario/usuario.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent,
    SimpleHeaderComponent,
    SimpleFooterComponent,
    SimpleSidebarComponent,
    ListUserComponent,
    UsuarioComponent,

  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
  ],
  exports: [
    FullLayoutComponent,
    SimpleLayoutComponent,
  ]
})
export class LayoutModule { }

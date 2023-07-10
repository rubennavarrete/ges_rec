import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UserModule } from 'src/app/components/usuarios/user.module';
import { UsuariosComponent } from './usuarios.component';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    UserModule
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTES
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//MODULOS
import { LoginModule } from '../pages/login/login.module';
import { UserModule} from '../components/usuarios/user.module';
// import { FarmModule } from '../components/farmacias/farm.module';
import { DashboardModule } from '../shared/dashboard.module';
import { MedicoModule } from '../components/medicos/medico.module';



@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    CommonModule,
    // LoginModule,
    
    // ReactiveFormsModule,
    // FarmModule,
    // UserModule,
    // DashboardModule,
    // MedicoModule
    RouterModule.forChild([]),
    DashboardModule

  ],
  exports: [
    FullLayoutComponent,
    SimpleLayoutComponent,
  ]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTES
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//MODULOS
import { LoginModule } from '../components/login/login.module';
import { UserModule} from '../components/usuarios/user.module';
import { FarmModule } from '../components/farmacias/farm.module';
import { DashboardModule } from '../components/dashboard/dashboard.module';
import { MedicoModule } from '../components/medicos/medico.module';
import { MedicacionesModule } from '../components/medicaciones/medicaciones.module';



@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule.forChild([]),
    ReactiveFormsModule,
    FarmModule,
    UserModule,
    DashboardModule,
    MedicoModule,
    MedicacionesModule

  ],
  exports: [
    FullLayoutComponent,
    SimpleLayoutComponent,
  ]
})
export class LayoutModule { }

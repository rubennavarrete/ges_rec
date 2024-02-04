import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import config from 'config/config';
import { Layouts } from './layout/layout';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { AdminModule } from './pages/admin/admin.module';
import { MedicosModule } from './pages/medicos/medicos.module';
import { SessionGuard } from './core/guards/session.guard';
import { ResetPasswordModule } from './components/reset-password/reset-password.module';
import { ChangePasswordModule } from './components/change-password/change-password.module';
import { PacientesModule } from './pages/pacientes/pacientes.module';
import { FarmaciaModule } from './pages/farmacia/farmacia.module';
import { Error404Module } from './pages/error404/error404.module';


const routes: Routes = [
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.Simple},
    children:[
      {path:'', loadChildren:() => HomeModule},
      {path:'login', loadChildren:() => LoginModule},
      {path:'reset', loadChildren:() => ResetPasswordModule},
      {path:'reset_password', loadChildren:() => ChangePasswordModule},
      {path:'error404', loadChildren:() => Error404Module}
    ]
    // component: SimpleLayoutComponent,
  },
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.Full},
    children:[
      {
        path:'admin', loadChildren:() => AdminModule,
        data: {
          role: 'Administrador'  
        },
        canActivate: [SessionGuard]
      },
      {
        path:'medicos', loadChildren:() => MedicosModule,
        data: {
          role: 'Medico'  
        },
        canActivate: [SessionGuard]
      },
      {
        path:'pacientes', loadChildren:() => PacientesModule,
        data: {
          role: 'Paciente'  
        },
        canActivate: [SessionGuard]
      },
      {
        path:'farmacias', loadChildren:() => FarmaciaModule,
        data: {
          role: 'Farmacia'  
        },
        canActivate: [SessionGuard]
      },
    ]
  },
  
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

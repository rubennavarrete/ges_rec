import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import config from 'config/config';
import { Layouts } from './layout/layout';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { AdminModule } from './pages/admin/admin.module';
import { SessionGuard } from './core/guards/session.guard';
import { ResetPasswordModule } from './components/reset-password/reset-password.module';


const routes: Routes = [
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.Simple},
    children:[
      {path:'', loadChildren:() => HomeModule},
      {path:'login', loadChildren:() => LoginModule},
      {path:'reset', loadChildren:() => ResetPasswordModule}
    ]
    // component: SimpleLayoutComponent,
  },
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.Full},
    children:[
      {path:'admin', loadChildren:() => AdminModule,
      canActivate: [SessionGuard]},
      // {path:'farmacia', loadChildren:() => HomeModule}
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

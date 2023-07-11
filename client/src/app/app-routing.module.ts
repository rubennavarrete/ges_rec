import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import { LoginComponent } from './pages/login/login.component';
import{SimpleLayoutComponent} from './layout/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { UsuarioComponent } from './components/usuarios/modals/usuario/usuario.component';
import config from 'config/config';
import { Layouts } from './layout/layout';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { AdminModule } from './pages/admin/admin.module';


const routes: Routes = [
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.Simple},
    children:[
      {path:'', loadChildren:() => HomeModule},
      {path:'login', loadChildren:() => LoginModule}
    ]
    // component: SimpleLayoutComponent,
  },
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.Full},
    children:[
      {path:'admin', loadChildren:() => AdminModule},
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

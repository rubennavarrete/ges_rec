import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import { LoginComponent } from './components/login/login.component';
import{SimpleLayoutComponent} from './layout/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { UsuarioComponent } from './components/usuarios/modals/usuario/usuario.component';


const routes: Routes = [
  {
    path: 'home',
    component: SimpleLayoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: FullLayoutComponent
  },
  {
    path: 'adduser',
    component: UsuarioComponent
  },
  {
    path: 'edit/:cedula',
    component: UsuarioComponent
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

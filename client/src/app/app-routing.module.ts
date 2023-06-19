import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTS
import { LoginComponent } from './components/login/login.component';
import{SimpleLayoutComponent} from './layout/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

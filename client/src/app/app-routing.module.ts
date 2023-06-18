import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import{SimpleLayoutComponent} from './layout/simple-layout/simple-layout.component';


const routes: Routes = [
  {
    path: '',
    component: SimpleLayoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'dashboard',
  //   component: SimpleSidebarComponent
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

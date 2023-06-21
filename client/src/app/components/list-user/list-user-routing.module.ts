import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list-user.component';
import { UsuarioComponent } from '../usuario/usuario.component';

const routes: Routes = [{ path: '', component: ListUserComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [
        ListUserComponent,
        UsuarioComponent
    ],
})

export class ProfileRoutingModule { }
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsuarioComponent } from "./modals/usuario/usuario.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UpdateUserComponent } from "./modals/update-user/update-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { DashboardModule } from "src/app/shared/dashboard.module";
import { EditProfileComponent } from './modals/edit-profile/edit-profile.component';

@NgModule({
    declarations: [UsuarioComponent, UpdateUserComponent, ListUserComponent, EditProfileComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardModule,
        FormsModule
    ],
    exports: [UsuarioComponent, UpdateUserComponent, ListUserComponent, EditProfileComponent]
})

export class UserModule { }

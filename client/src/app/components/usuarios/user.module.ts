import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsuarioComponent } from "./modals/usuario/usuario.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UpdateUserComponent } from "./modals/update-user/update-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { DashboardModule } from "src/app/shared/dashboard.module";

@NgModule({
    declarations: [UsuarioComponent, UpdateUserComponent, ListUserComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardModule
    ],
    exports: [UsuarioComponent, UpdateUserComponent, ListUserComponent]
})

export class UserModule { }

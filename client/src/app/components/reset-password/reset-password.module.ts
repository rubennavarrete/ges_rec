import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ResetPasswordComponent } from "./reset-password.component";


@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [ResetPasswordComponent]
})

export class ResetModule { }


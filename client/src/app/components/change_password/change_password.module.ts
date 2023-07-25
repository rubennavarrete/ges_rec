import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { Change_passwordComponent } from './change_password.component';


@NgModule({
    declarations: [Change_passwordComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [Change_passwordComponent]
})



export class Change_passwordModule { }


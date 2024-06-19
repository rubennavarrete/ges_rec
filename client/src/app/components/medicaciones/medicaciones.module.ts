import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListMedicacionesComponent } from "./list-medicaciones/list-medicaciones.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddMedicacionesComponent } from "./modals/add-medicaciones/add-medicaciones.component";
import { UpdateMedicacionesComponent } from "./modals/update-medicaciones/update-medicaciones.component";
import { DashboardModule } from "src/app/shared/dashboard.module";

@NgModule({
    declarations: [AddMedicacionesComponent, UpdateMedicacionesComponent, ListMedicacionesComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardModule,
        FormsModule
    ],
    exports: [AddMedicacionesComponent, UpdateMedicacionesComponent, ListMedicacionesComponent]
})

export class Medicaciones1Module { }
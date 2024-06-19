import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddPacienteComponent } from "./modals/add-paciente/add-paciente.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UpdatePacienteComponent } from "./modals/update-paciente/update-paciente.component";
import { ListPacientesComponent } from "./list-pacientes/list-pacientes.component";
import { DashboardModule } from "src/app/shared/dashboard.module";
import { Router, RouterModule } from "@angular/router";

@NgModule({
    declarations: [AddPacienteComponent, UpdatePacienteComponent, ListPacientesComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardModule,
        RouterModule.forChild([])
    ],
    exports: [AddPacienteComponent, UpdatePacienteComponent, ListPacientesComponent]
})

export class MedicoModule { }

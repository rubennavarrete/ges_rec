import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddPacienteComponent } from "./modals/add-paciente/add-paciente.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UpdatePacienteComponent } from "./modals/update-paciente/update-paciente.component";
import { ListPacientesComponent } from "./list-pacientes/list-pacientes.component";
import { AddRecetaComponent } from "./modals/add-receta/add-receta.component";

@NgModule({
    declarations: [AddPacienteComponent, UpdatePacienteComponent, ListPacientesComponent, AddRecetaComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [AddPacienteComponent, UpdatePacienteComponent, ListPacientesComponent, AddRecetaComponent]
})

export class MedicoModule { }

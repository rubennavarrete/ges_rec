import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecetasComponent } from './list-recetas/list-recetas.component';
import { AddRecetaComponent } from './modals/add-receta/add-receta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from 'src/app/shared/dashboard.module';
import { EditRecetaComponent } from './modals/edit-receta/edit-receta.component';
import { ListRecetaPacienteComponent } from './list-receta-paciente/list-receta-paciente.component';
import { SellRecetaComponent } from './modals/sell-receta/sell-receta.component';



@NgModule({
  declarations: [ListRecetasComponent,AddRecetaComponent, EditRecetaComponent, ListRecetaPacienteComponent, SellRecetaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardModule,
    FormsModule
  ],
  exports: [ListRecetasComponent,AddRecetaComponent, EditRecetaComponent, ListRecetaPacienteComponent, SellRecetaComponent]
})
export class DiagnosticoModule { }

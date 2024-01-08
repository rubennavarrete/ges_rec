import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecetasComponent } from './list-recetas/list-recetas.component';
import { AddRecetaComponent } from './modals/add-receta/add-receta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from 'src/app/shared/dashboard.module';
import { EditRecetaComponent } from './modals/edit-receta/edit-receta.component';



@NgModule({
  declarations: [ListRecetasComponent,AddRecetaComponent, EditRecetaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardModule
  ],
  exports: [ListRecetasComponent,AddRecetaComponent]
})
export class DiagnosticoModule { }

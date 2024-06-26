import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals/modals.component';
import { UserModule } from '../components/usuarios/user.module';
import { MedicoModule } from '../components/medicos/medico.module';
import { FarmModule } from '../components/farmacias/farm.module';
import { Medicaciones1Module } from '../components/medicaciones/medicaciones.module';
import { DiagnosticoModule } from '../components/diagnosticos/diagnostico.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ModalsComponent],
  imports: [
    CommonModule,
    UserModule,
    MedicoModule,
    FarmModule,
    Medicaciones1Module,
    DiagnosticoModule,
    RouterModule.forChild([])
  ],
  exports: [
    ModalsComponent
  ]
})
export class ModalModule { }

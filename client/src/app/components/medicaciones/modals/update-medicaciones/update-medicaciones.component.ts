import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MedicacionResponse } from 'src/app/core/models/medicacion';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-medicaciones',
  templateUrl: './update-medicaciones.component.html',
  styleUrls: ['./update-medicaciones.component.css']
})
export class UpdateMedicacionesComponent implements OnDestroy, OnInit {

  get nombre_comercial() {
    return this.editFormMed.controls['nombre_comercial'];
  }
  get tipo() {
    return this.editFormMed.controls['tipo'];
  }
  get codigo_registro() {
    return this.editFormMed.controls['codigo_registro'];
  }

  editFormMed: FormGroup;
  UserError: string = '';

  constructor(private fb:FormBuilder, public srvMed:AddMedicacionesService, private srvModal: ModalsService) {
    this.editFormMed = this.fb.group({
      id_medicacion: [0],
      codigo_registro: ['', Validators.required],
      nombre_comercial: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }
  private destroy$ = new Subject<any>();
  
  updateMedicacion() {
    Swal.fire({
      title: '¿Está seguro que desea modificar este Medicamento?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos actualizando el medicamento',
          icon: 'info',
          allowOutsideClick: false
        });
        if (this.editFormMed.valid) {
          this.srvMed.updateMedicacion(this.editFormMed.value).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: (data:MedicacionResponse) => {
              if(data.status == "success"){
                Swal.close();
                Swal.fire({
                  title: 'Medicamento modificado',
                  text: 'El medicamento se ha actualizado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }else{
                Swal.close();
                Swal.fire({
                  title: 'Error',
                  text: 'El medicamento no se ha actualizado correctamente',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              this.srvMed.setConfirmAdd(true);
              this.srvModal.closeModal();
              this.editFormMed.reset();

            }
          });
        } else {
          this.UserError = 'Los datos ingresados son incorrectos';
        }
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
}
  
  
  ngOnInit(): void {
    this.srvMed.SeleccionarConfirmEdit$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.editFormMed = this.fb.group({
          id_medicacion: [data.int_id_medicacion, Validators.required],
          nombre_comercial: [data.str_nombre_comercial, Validators.required],
          tipo: [data.str_forma_farmaceutica, Validators.required],
          codigo_registro: [data.str_cod_registro, Validators.required],
        });
        console.log('LLEGUE BIEN',data);
        console.log('ME LLENE?',this.editFormMed);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

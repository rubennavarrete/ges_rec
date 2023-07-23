import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MedicacionResponse } from 'src/app/core/models/medicacion';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-medicaciones',
  templateUrl: './update-medicaciones.component.html',
  styleUrls: ['./update-medicaciones.component.css']
})
export class UpdateMedicacionesComponent implements OnDestroy, OnInit {

  get nombre_generico() {
    return this.editFormMed.controls['nombre_generico'];
  }

  get nombre_comercial() {
    return this.editFormMed.controls['nombre_comercial'];
  }

  editFormMed: FormGroup;
  UserError: string = '';
  constructor(private fb:FormBuilder, public srvMed:AddMedicacionesService) {
    this.editFormMed = this.fb.group({
      str_nombre_comercial: ['', Validators.required],
      str_nombre_generico: ['', Validators.required],
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
          id_medicacion: [data.int_id_medicacion],
          nombre_comercial: [data.str_nombre_comercial, Validators.required],
          nombre_generico: [data.str_nombre_generico, Validators.required],
        });
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

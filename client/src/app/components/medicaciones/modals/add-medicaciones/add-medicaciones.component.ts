import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MedicacionResponse } from 'src/app/core/models/medicacion';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-medicaciones',
  templateUrl: './add-medicaciones.component.html',
  styleUrls: ['./add-medicaciones.component.css']
})
export class AddMedicacionesComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<any>();

  MedError: string = '';
  medicamentoform: FormGroup;

  get tipo() {
    return this.medicamentoform.controls['tipo'];
  }
  get codigo_registro() {
    return this.medicamentoform.controls['codigo_registro'];
  }

  get nombre_comercial() {
    return this.medicamentoform.controls['nombre_comercial'];
  }


  constructor(private fb: FormBuilder, public srvMed:AddMedicacionesService, private srvModal: ModalsService ) {
    this.medicamentoform = this.fb.group({
      nombre_generico: ['', Validators.required],
      nombre_comercial: ['', Validators.required],
    });
  }
  
  addMedicamento() {
    Swal.fire({
      title: '¿Está seguro que desea agregar este Medicamento?',
      showDenyButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Agregando Medicamento',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        if(this.medicamentoform.valid){
          this.srvMed.postMedicacion(this.medicamentoform.value).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: MedicacionResponse) => {
              //console.log(data);
              if(data.status == "success"){
                Swal.close();
                Swal.fire({
                  title: 'Medicamento registrado',
                  text: 'El medicamento se ha registrado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }else{
                Swal.close();
                Swal.fire({
                  title: 'Error',
                  text: 'El medicamento no se ha registrado correctamente',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (error) => {
              console.log(error);
              this.MedError = error;
            },
            complete: () => {
              this.srvMed.setConfirmAdd(true);
              this.srvModal.closeModal();
              this.medicamentoform.reset();
              // this.location.back();
            }
          });
        }else{
          this.medicamentoform.markAllAsTouched();
          alert("Debe ingresar los datos correctamente");
        }

      } else if (result.isDenied) {
        Swal.fire('No se agrego el Medicamento', '', 'info');

        
      }
    });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, Form } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Medicamentos, Receta, RecetaResponse } from 'src/app/core/models/receta';
import { AddRecetaService } from 'src/app/core/services/add-receta.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-receta',
  templateUrl: './add-receta.component.html',
  styleUrls: ['./add-receta.component.css']
})
export class AddRecetaComponent implements OnInit, OnDestroy {

  RecError: string = '';
  FarmError: string = '';
  medicamentoform: FormGroup;
  recetaform: FormGroup;

  medicamento: Medicamentos[] = [] ;

  medicamentoSeleccionado: Medicamentos | null = null;


  get nombreM() {
    return this.medicamentoform.controls['nombreM'];
  }
  get cantidadM() {
    return this.medicamentoform.controls['cantidadM'];
  }
  get dosisM() {
    return this.medicamentoform.controls['dosisM'];
  }
  get duracionM() {
    return this.medicamentoform.controls['duracionM'];
  }
  get indicacionesM() {
    return this.medicamentoform.controls['indicacionesM'];
  }

  get diagnostico() {
    return this.recetaform.controls['diagnostico'];
  }

  private destroy$ = new Subject<any>();
  
  constructor(private fb: FormBuilder, private srvRec: AddRecetaService, public srvUser:AddUserService) {
    this.recetaform = this.fb.group({
      id_medico: [''] ,
      id_paciente: [''],
      diagnostico: ['', Validators.required],
      medicamentos: this.medicamentoform = this.fb.group({
        nombreM: ['', Validators.required],
        cantidadM: ['', Validators.required],
        dosisM: ['', Validators.required],
        duracionM: ['', Validators.required],
        indicacionesM: ['', Validators.required]
      }),
    });
  }

  addMedicamento() {
    if (this.medicamentoSeleccionado) {
      // Editar el objeto seleccionado
      this.medicamentoSeleccionado.nombre = this.medicamentoform.value.nombreM;
      this.medicamentoSeleccionado.cantidad = this.medicamentoform.value.cantidadM;
      this.medicamentoSeleccionado.dosis = this.medicamentoform.value.dosisM;
      this.medicamentoSeleccionado.duracion = this.medicamentoform.value.duracionM;
      this.medicamentoSeleccionado.indicaciones = this.medicamentoform.value.indicacionesM;
  
      this.medicamentoSeleccionado = null; // Reiniciar el objeto seleccionado
    } else {
      // Crear un nuevo objeto y agregarlo al array
      const nuevoMedicamento: Medicamentos = {
        nombre: this.medicamentoform.value.nombreM,
        id_medicacion: 1,
        cantidad: this.medicamentoform.value.cantidadM,
        dosis: this.medicamentoform.value.dosisM,
        duracion: this.medicamentoform.value.duracionM,
        indicaciones: this.medicamentoform.value.indicacionesM
      };
      this.medicamento.push(nuevoMedicamento);
    }

    console.log(this.medicamento);
  
    this.medicamentoform.reset();
  }

  editarMedicamento(med: Medicamentos) {
    this.medicamentoSeleccionado = med;
    this.medicamentoform.patchValue({
      nombreM: med.nombre,
      dosisM: med.dosis,
      duracionM: med.duracion,
      indicacionesM: med.indicaciones
    });
  }

  eliminarMedicamento(index: number) {
    this.medicamento.splice(index, 1);
    console.log(this.medicamento);
  }

  postReceta() {
    Swal.fire({
      title: '¿Está seguro que desea crear esta Receta?',
      showDenyButton: true,
      confirmButtonText: 'Crear',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Receta',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.recetaform.value.medicamentos = this.medicamento;
        console.log(this.recetaform.value);
        if (this.recetaform.valid) {
          this.srvRec.postReceta(this.recetaform.value).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: RecetaResponse) => {
              console.log(data);
              if (data.status === 'success') {
              Swal.fire({
                title: 'Receta registrada',
                text: 'La Receta se ha registrado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo crear la Receta',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (error) => {
              console.log(error);
              this.RecError = error;
            },
            complete: () => {
              this.srvRec.setConfirmAdd(true);
              this.recetaform.reset();
              this.medicamentoform.reset();
            }
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.srvUser.SeleccionarConfirmEdit$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.recetaform = this.fb.group({
          id_medico: [''] ,
          id_paciente: [data.int_id_usuario],
          diagnostico: ['', Validators.required],
          medicamentos: this.medicamentoform = this.fb.group({
            nombreM: ['', Validators.required],
            cantidadM: ['', Validators.required],
            dosisM: ['', Validators.required],
            duracionM: ['', Validators.required],
            indicacionesM: ['', Validators.required]
          }),
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

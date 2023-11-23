import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, pipe, takeUntil } from 'rxjs';
import { DataFarm } from 'src/app/core/models/farm';
import { AddFarmService } from 'src/app/core/services/add-farm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-farm',
  templateUrl: './update-farm.component.html',
  styleUrls: ['./update-farm.component.css']
})
export class UpdateFarmComponent implements OnInit, OnDestroy {

  get nombre() {
    return this.editfarm.controls['nombre'];
  }
  get direccion() {
    return this.editfarm.controls['direccion'];
  }
  get telefono() {
    return this.editfarm.controls['telefono'];
  }
  get correo() {
    return this.editfarm.controls['correo'];
  }
  get nombre_representante() {
    return this.editfarm.controls['nombre_representante'];
  }
  get celular_representante() {
    return this.editfarm.controls['celular_representante'];
  }

  private destroy$ = new Subject<any>();

  editfarm: FormGroup;
  farmError: string = '';
  constructor(private fb:FormBuilder, public srvFarm:AddFarmService) {
    this.editfarm = this.fb.group({
          nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ ]+$/)]],
          direccion: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ ]+$/)]],
          telefono: ['', [Validators.minLength(7), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)]],
          correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
          password: ['',],
          nombre_representante: ['',[Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ ]+$/)]],
          celular_representante: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
        });
  }

  updateFarmacia() {
    Swal.fire({
      title: '¿Está seguro que desea modificar esta Farmacia?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos actualizando la farmacia',
          icon: 'info',
          allowOutsideClick: false
        });
        if (this.editfarm.valid) {
          this.srvFarm.putFarmacia(this.editfarm.value).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: (data:DataFarm) => {
              if(data.status == "success"){
                Swal.close();
                Swal.fire({
                  title: 'Farmacia modificada',
                  text: 'La farmacia se ha actualizado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }else{
                Swal.close();
                Swal.fire({
                  title: 'Error',
                  text: 'La farmacia no se ha actualizado correctamente',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              this.srvFarm.setConfirmAdd(true);
              this.editfarm.reset();
              

            }
          });
        } else {
          this.farmError = 'Los datos ingresados son incorrectos';
        }
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });

  }

  ngOnInit(): void {
    this.srvFarm.SeleccionarConfirmEdit$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.editfarm = this.fb.group({
          nombre: [data.str_nombre_institucion],
          direccion: [data.txt_direccion_institucion,[Validators.required]],
          ruc: [data.str_ruc],
          telefono: [data.str_telefono_institucion, [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
          correo: [data.str_correo_institucion, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]] ,
          password: [''],
          nombre_representante: [data.str_nombre_representante],
          celular_representante: [data.str_celular_representante],
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
  });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DataFarm } from 'src/app/core/models/farm';
import { AddFarmService } from 'src/app/core/services/add-farm.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit, OnDestroy {
  farmform: FormGroup;
  FarmError: string = '';
  private destroy$ = new Subject<any>();
  
  get nombre() {
    return this.farmform.controls['nombre'];
  }
  get direccion() {
    return this.farmform.controls['direccion'];
  }
  get telefono() {
    return this.farmform.controls['telefono'];
  }
  get correo() {
    return this.farmform.controls['correo'];
  }
  get password() {
    return this.farmform.controls['password'];
  }
  get ruc() {
    return this.farmform.controls['ruc'];
  }
  get nombre_representante() {
    return this.farmform.controls['nombre_representante'];
  }
  get celular_representante() {
    return this.farmform.controls['celular_representante'];
  }

  constructor(private fb: FormBuilder, private srvFarm: AddFarmService, private srvModal: ModalsService ) { 
    this.farmform = this.fb.group({
      nombre: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      ruc: ['',[Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]] ,
      password: ['', Validators.required],
      nombre_representante: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ ]+$/)]],
      celular_representante: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
    });
  }
  
  addFarmacia() {
    
    Swal.fire({
      title: '¿Está seguro que desea agregar esta Farmacia?',
      showDenyButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Farmacia',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        if (this.farmform.valid) {
          this.srvFarm.postFarmacia(this.farmform.value).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: DataFarm) => {
              //console.log(data);
              if(data.status=="success"){
                Swal.close();
                Swal.fire({
                  title: 'Farmacia registrada',
                  text: 'La farmacia se ha registrado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }else{
                Swal.close();
                Swal.fire({
                  title: 'Error',
                  text: 'La farmacia no se ha podido registrar',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (err: any) => {
              console.log(err);
              this.FarmError = err.error.msg;
            },
            complete: () => {
              this.farmform.reset();
              this.srvModal.closeModal();
              this.srvFarm.setConfirmAdd(true);
            }
          });
        } else {
          this.FarmError = 'Los datos ingresados son incorrectos';
          alert("Debe ingresar los datos correctamente");
        }
      }else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info')
      }
    });
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}

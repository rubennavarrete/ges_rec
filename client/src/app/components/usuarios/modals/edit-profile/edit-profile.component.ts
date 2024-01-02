import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DataUser } from 'src/app/core/models/user';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnDestroy, OnInit{

  get telefono() {
    return this.editProfile.controls['telefono'];
  }
  get celular() {
    return this.editProfile.controls['celular'];
  }
  get direccion() {
    return this.editProfile.controls['direccion'];
  }
  get genero() {
    return this.editProfile.controls['genero'];
  }
  get correo() {
    return this.editProfile.controls['correo'];
  }

  get nombres() {
    return this.editProfile.controls['nombres'];
  }

  get apellidos() {
    return this.editProfile.controls['apellidos'];
  }

  get cedula() {
    return this.editProfile.controls['cedula'];
  }

  get password() {
    return this.editProfile.controls['password'];
  }



  editProfile: FormGroup;
  UserError: string = '';
  constructor(private fb:FormBuilder, public srvUser:AddUserService, private srvModal: ModalsService) {
    this.editProfile = this.fb.group({
          cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)] ],
          nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ ]+$/)]],
          apellidos: ['',[Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ ]+$/)]],
          correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
          password: ['', ],
          fecha_nac: [new Date()],
          genero: ['', Validators.required],
          telefono: ['', [Validators.minLength(7), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)]],
          celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
          direccion: [''],
        });
  }
  private destroy$ = new Subject<any>();
  
  updateUsuario() {
    Swal.fire({
      title: '¿Está seguro que desea modificar tu Perfil?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos actualizando tu perfil',
          icon: 'info',
          allowOutsideClick: false
        });
        if (this.editProfile.valid) {
          this.srvUser.updateUsuario(this.editProfile.value).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: (data:DataUser) => {
              if(data.status == "success"){
                Swal.close();
                Swal.fire({
                  title: 'Perfil modificado',
                  text: 'Tu perfil se ha actualizado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }else{
                Swal.close();
                Swal.fire({
                  title: 'Error',
                  text: 'Tu perfil no se ha actualizado correctamente',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              this.srvUser.setConfirmAddProfile(true);
              this.srvModal.closeModal();
              this.editProfile.reset();

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
    this.srvUser.SeleccionarConfirmEditProfile$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.editProfile = this.fb.group({
          cedula: [data.str_cedula, ],
          nombres: [data.str_nombres,],
          apellidos: [data.str_apellidos,],
          correo: [data.str_correo, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
          password: [''],
          fecha_nac: [data.dt_fecha_nac],
          genero: [data.bln_genero, Validators.required],
          telefono: [data.str_telefono, [Validators.minLength(7), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)]],
          celular: [data.str_celular, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
          direccion: [data.txt_direccion],
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

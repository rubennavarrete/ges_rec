import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DataUser } from 'src/app/core/models/user';
import { AddUserService } from 'src/app/core/services/add-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-paciente',
  templateUrl: './update-paciente.component.html',
  styleUrls: ['./update-paciente.component.css']
})
export class UpdatePacienteComponent {

  get telefono() {
    return this.editform.controls['telefono'];
  }
  get celular() {
    return this.editform.controls['celular'];
  }
  get direccion() {
    return this.editform.controls['direccion'];
  }
  get genero() {
    return this.editform.controls['genero'];
  }
  get correo() {
    return this.editform.controls['correo'];
  }

  editform: FormGroup;
  UserError: string = '';
  constructor(private fb:FormBuilder, public srvUser:AddUserService) {
    this.editform = this.fb.group({
          cedula: ['', ],
          nombres: ['',],
          apellidos: ['',],
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
      title: '¿Está seguro que desea modificar este Paciente?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos actualizando el paciente',
          icon: 'info',
          allowOutsideClick: false
        });
        if (this.editform.valid) {
          this.editform.get('nombres')?.enable();
          this.editform.get('apellidos')?.enable();
          this.editform.get('cedula')?.enable();
          this.editform.get('fecha_nac')?.enable();
          this.editform.get('password')?.enable();
          this.srvUser.updateUsuario(this.editform.value).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: (data:DataUser) => {
              if(data.status == "success"){
                Swal.close();
                Swal.fire({
                  title: 'Paciente modificado',
                  text: 'El paciente se ha actualizado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }else{
                Swal.close();
                Swal.fire({
                  title: 'Error',
                  text: 'El paciente no se ha actualizado correctamente',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              this.srvUser.setConfirmAdd(true);
              this.editform.reset();
              console.log('complete');

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
    this.srvUser.SeleccionarConfirmEdit$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.editform = this.fb.group({
          cedula: [data.str_cedula, ],
          nombres: [data.str_nombres,],
          apellidos: [data.str_apellidos,],
          correo: [data.str_correo, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
          password: [data.str_password, ],
          fecha_nac: [data.dt_fecha_nac],
          genero: [data.bln_genero, Validators.required],
          telefono: [data.str_telefono, [Validators.minLength(7), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)]],
          celular: [data.str_celular, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
          direccion: [data.txt_direccion],
        });
        this.editform.get('nombres')?.disable();
        this.editform.get('apellidos')?.disable();
        this.editform.get('cedula')?.disable();
        this.editform.get('fecha_nac')?.disable();
        this.editform.get('password')?.disable();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}

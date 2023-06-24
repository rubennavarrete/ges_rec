import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataUser } from 'src/app/core/models/user';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy{
  
  private destroy$ = new Subject<any>();
  userform: FormGroup;
  UserError: string = '';

  get nombres() {
    return this.userform.controls['nombres'];
  }
  get apellidos() {
    return this.userform.controls['apellidos'];
  }
  get cedula() {
    return this.userform.controls['cedula'];
  }
  get correo() {
    return this.userform.controls['correo'];
  }
  get password() {
    return this.userform.controls['password'];
  }
  get fecha_nac() {
    return this.userform.controls['fecha_nac'];
  }
  get genero() {
    return this.userform.controls['genero'];
  }
  get celular() {
    return this.userform.controls['celular'];
  }
  get telefono() {
    return this.userform.controls['telefono'];
  }


  constructor(private fb: FormBuilder, private srvUser: AddUserService, private router:Router, private location: Location) {
    this.userform = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
      password: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', [Validators.minLength(7), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      direccion: [''],
      rol: [2],
    });
  }
  addUsuario() {
    Swal.fire({
      title: '¿Está seguro que desea agregar este Usuario?',
      showDenyButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Usuario',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        if(this.userform.valid){
          this.srvUser.postUsuario(this.userform.value).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: DataUser) => {
              console.log(data);
              if(data.status == "success"){
                Swal.close();
                Swal.fire({
                  title: 'Usuario registrado',
                  text: 'El usuario se ha registrado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }else{
                Swal.close();
                Swal.fire({
                  title: 'Error',
                  text: 'El usuario no se ha registrado correctamente',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (error) => {
              console.log(error);
              this.UserError = error;
            },
            complete: () => {
              this.srvUser.setConfirmAdd(true);
              this.userform.reset();
              // this.location.back();
            }
          });
        }else{
          this.userform.markAllAsTouched();
          alert("Debe ingresar los datos correctamente");
        }

      } else if (result.isDenied) {
        Swal.fire('No se agrego el Usuario', '', 'info');

        
      }
    });

  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}


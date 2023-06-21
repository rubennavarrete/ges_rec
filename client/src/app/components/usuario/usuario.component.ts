import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AddUserService } from 'src/app/core/services/add-user.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy{
  
  private destroy$ = new Subject<any>();
  userform: FormGroup;


  constructor(private fb: FormBuilder, private srvAddUser: AddUserService, private router:Router ) {
    this.userform = this.fb.group({
      cedula: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)],
      nombres: ['', Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      apellidos: ['', Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      correo: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)],
      celular: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)],
      direccion: ['', Validators.required,],
      rol: [2, Validators.required],
    });
  }

  getUsuarios() {
    this.srvAddUser.getUsuarios().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addUser() {
    if(this.userform.valid){
      this.srvAddUser.postUser(this.userform.value).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          console.log(data);
          this.userform.reset();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      this.userform.markAllAsTouched();
      alert("Debe ingresar los datos correctamente");
    }
  }
  


  ngOnInit(): void {
    this.getUsuarios();
  }
  ngOnDestroy(): void {}
}


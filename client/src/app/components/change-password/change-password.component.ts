import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { Change, ChangeResponse } from 'src/app/core/models/login';
import { ResetPasswordService } from 'src/app/core/services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  ResetPasswordError: string = '';
  private destroy$ = new Subject<any>();

  get password() {
    return this.resetPass.controls.password
  }

  get confirm_password() {
    return this.resetPass.controls.confirm_password
  }


  resetPass = this.fb.group({
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private srvReset: ResetPasswordService, private router:Router, 
    private cookieService: CookieService) { }

    changePassword() {
      if (this.resetPass.valid) {
        if (this.resetPass.value.password != this.resetPass.value.confirm_password) {
          alert('Las contraseñas no coinciden');
          return;
        }
    
        // Mostrar el SweetAlert para confirmar el cambio de contraseña
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Deseas cambiar tu contraseña?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cambiar contraseña',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.srvReset.changePassword(this.resetPass.value as Change).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: ChangeResponse) => {
                if (data.status == "success") {
                  // SweetAlert para informar que la contraseña ha sido cambiada
                  Swal.fire({
                    title: 'Contraseña cambiada',
                    text: 'Tu contraseña ha sido cambiada exitosamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    this.router.navigate(['/login']);
                  });
                }
              },
              error: (error) => {
                console.log(error);
                this.ResetPasswordError = error.error.message;
                alert(this.ResetPasswordError);
              }
            });
          }
        });
      } else {
        this.resetPass.markAllAsTouched();
      }
    }
    

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}

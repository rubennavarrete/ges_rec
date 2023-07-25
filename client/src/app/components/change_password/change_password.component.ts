import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, take, takeUntil } from 'rxjs';
import { Change, ChangeResponse } from 'src/app/core/models/login';
import { ResetPasswordService } from 'src/app/core/services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change_password',
  templateUrl: './change_password.component.html',
  styleUrls: ['./change_password.component.css']
})
export class Change_passwordComponent implements OnInit, OnDestroy {
  
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
                  this.router.navigate(['/login']);
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

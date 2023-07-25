import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { Reset, ResetResponse } from 'src/app/core/models/login';
import { ResetPasswordService } from 'src/app/core/services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  
  LoginError: string = '';
  private destroy$ = new Subject<any>();
  resetForm = this.fb.group({
    correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
  });

  get correo() {
    return this.resetForm.get('correo');
  }

  constructor(private fb: FormBuilder, private srvReset:ResetPasswordService,
    private router:Router, 
    private cookieService: CookieService ) {
    this.resetForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      this.srvReset.resetPassword(this.resetForm.value as Reset).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: ResetResponse) => {
          console.log(data);
          if (data.status == "success") {
            Swal.fire({
              icon: 'success',
              title: 'Correo enviado',
              text: 'Se ha enviado un correo para recuperar la contraseña',
              confirmButtonText: 'Aceptar',
            });
            this.cookieService.set('token', data.token);
            this.resetForm.reset();
          }
        },
        error: (error) => {
          console.log(error);
          this.LoginError = error.error.message;
          alert(this.LoginError);
        }
      });
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}

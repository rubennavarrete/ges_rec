import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { DataLogin, LoginRequest} from '../../core/models/login';
import { Subject, takeUntil } from 'rxjs';
import { Data, Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import config from 'config/config';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy{
  showPassword: boolean = false;
  LoginError: string = '';
  loginForm = this.fb.group({
    cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
    password: ['', [Validators.required]],
  });

  get cedula() {
    return this.loginForm.controls.cedula
  }
  get password() {
    return this.loginForm.controls.password
  }

  private destroy$ = new Subject<any>();
  constructor(private fb: FormBuilder, private srvLogin: LoginService, private router:Router, 
    private cookieService: CookieService
    ) {}
  ngOnInit(): void {}


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  login() {
    if(this.loginForm.valid){
      this.srvLogin.getLogin(this.loginForm.value as LoginRequest).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: DataLogin) => {
          //console.log(data);
          if(data.status == "success"){

            this.cookieService.set('token', data.token);
            // this.router.navigate(['/admin']);
            window.location.href = config.URL_BASE_PATH + '/admin';
            this.loginForm.reset();
          }
        },
        error: (error) => {
          console.log(error);
          this.LoginError = error.error.message;
          alert(this.LoginError);
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
      alert("Debe ingresar los datos correctamente");
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}

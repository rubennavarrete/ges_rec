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
    cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern(/^[0-9]\d*$/)]],
    password: ['', [Validators.required]],
  });
  tokenData: any;

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

            this.getTokenData();

            console.log('Valores del token:', this.tokenData);

            if(this.tokenData.rol == 'Administrador'){
            window.location.href = config.URL_BASE_PATH + '/admin';
            this.loginForm.reset();
            }
            if(this.tokenData.rol == 'Medico'){
              window.location.href = config.URL_BASE_PATH + '/medicos';
              this.loginForm.reset();
              }
            }
            if(this.tokenData.rol == 'Paciente'){
              window.location.href = config.URL_BASE_PATH + '/pacientes';
              this.loginForm.reset();
            }
            if(this.tokenData.rol == 'Farmacia'){
              window.location.href = config.URL_BASE_PATH + '/farmacias';
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

  getTokenData() {
    const token = this.cookieService.get('token'); // Reemplaza 'nombre_de_la_cookie' con el nombre real de tu cookie
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      this.tokenData = tokenPayload;
      // console.log('Valores del token:', this.tokenData);
    } else {
      // console.log('Token no encontrado en las cookies.');
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}

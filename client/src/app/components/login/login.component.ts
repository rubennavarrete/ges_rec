import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { DataLogin, LoginRequest} from '../../core/models/login';
import { Subject, takeUntil } from 'rxjs';
import { Data, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy{
  
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
  constructor(private fb: FormBuilder, private srvLogin: LoginService, private router:Router) {}
  login() {
    if(this.loginForm.valid){
      this.srvLogin.getLogin(this.loginForm.value as LoginRequest).pipe(takeUntil(this.destroy$)).subscribe(
        (data: DataLogin) => {
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data));
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
        },
        (error) => {
          console.log(error);
          this.LoginError = error.error.message;
        }
      );
    }else{
      this.loginForm.markAllAsTouched();
      alert("Debe ingresar los datos correctamente");
    }
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}

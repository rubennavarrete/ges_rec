import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { DataLogin, DataFormLogin } from '../../core/models/login';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  private destroy$ = new Subject<any>();
  constructor( public srvLogin:LoginService, public fb:FormBuilder) { 
    this.myForm = this.fb.group({
      cedula: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  logueo(){
    const dataFormLogin: DataFormLogin = {
      cedula: this.myForm.get('cedula')?.value,
      password: this.myForm.get('password')?.value
    };
    this.srvLogin.getLogin(dataFormLogin).pipe(takeUntil(this.destroy$)).subscribe(
      (data: DataLogin) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  ngOnDestroy(): void {}
}

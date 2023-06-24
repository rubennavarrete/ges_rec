import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit, OnDestroy {
  farmform: FormGroup;
  private destroy$ = new Subject<any>();
  
  get nombre() {
    return this.farmform.controls['nombre'];
  }
  get direccion() {
    return this.farmform.controls['direccion'];
  }
  get telefono() {
    return this.farmform.controls['telefono'];
  }
  get correo() {
    return this.farmform.controls['correo'];
  }
  get password() {
    return this.farmform.controls['password'];
  }
  get ruc() {
    return this.farmform.controls['ruc'];
  }

  constructor(private fb: FormBuilder ) { 
    this.farmform = this.fb.group({
      nombre: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      ruc: ['',[Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(9), Validators.pattern(/^[0-9]+$/)]],
      correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]] ,
      password: ['', Validators.required],
      rol: ['3'],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { initFlowbite } from 'flowbite';
import { AddRecetaService } from 'src/app/core/services/add-receta.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.css']
})
export class DiagnosticosComponent implements OnInit, OnDestroy{

  mostrarFormulario: boolean = false;
  tokenData: any;
  private destroy$ = new Subject<any>();

  constructor (private cookieService: CookieService,
                public srvReceta: AddRecetaService,) { }
 

  ngOnInit(): void {
    initFlowbite();
    this.getTokenData();
    this.srvReceta.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.mostrarFormulario = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
    


  }

  toggleForm() {
    this.mostrarFormulario = !this.mostrarFormulario;
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
  }

}

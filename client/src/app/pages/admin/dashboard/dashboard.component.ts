import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { AddFarmService } from 'src/app/core/services/add-farm.service';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';
import { AddRecetaService } from 'src/app/core/services/add-receta.service';
import { AddUserService } from 'src/app/core/services/add-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  
  tokenData: any;
  cantidad_med: any;
  cantidad_pac: any;
  cantidad_admin: any;
  cantidad_farm: any;
  cantidad_recetas: any;
  cantidad_medicamentos: any;


  dataUser: any[] = [];
  dataMed: any[] = [];

  private destroy$ = new Subject<any>();
  
    constructor(private router: Router,
      private cookieService: CookieService,
      public srvUser: AddUserService,
      public srvReceta: AddRecetaService,
      public srvFarm: AddFarmService,
      public srvMed: AddMedicacionesService,) { }
  
    ngOnInit(): void {
      initFlowbite();
      this.getTokenData();
      this.getPacientes({size: 5, page: 1, parameter: '', data: 0});
      this.getMedicos({size: 5, page: 1, parameter: '', data: 0});
      this.getRecetas({size: 5, page: 1, parameter: '', data: 0});
      this.getFarmacias({size: 5, page: 1, parameter: '', data: 0});
      this.getMedicaciones({size: 5, page: 1, parameter: '', data: 0});
    }

     //OBTENER TOKEN
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

    getPacientes(usuario: any) {
      this.srvUser.getPacientes(usuario)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data: any) => {
        this.cantidad_pac = data.total;
        this.dataUser = data.body;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    getMedicos(usuario: any) {
      this.srvUser.getMedicos(usuario)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data: any) => {
          //console.log(data);
          this.cantidad_med = data.total;
          this.dataMed = data.body;

        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    getRecetas(receta: any) {
      this.srvReceta.getRecetas(receta)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data:any) => {
          this.cantidad_recetas = data.total;  
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    getFarmacias(farmacia: any) {
      this.srvFarm.getFarmacias(farmacia)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data: any) => {
          this.cantidad_farm = data.total;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    getMedicaciones(medicacion: any) {
      this.srvMed.getMedicaciones(medicacion)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data:any) => {
          //console.log(data);
          this.cantidad_medicamentos = data.total;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    medicos(){
      this.router.navigate(['admin', 'medicos']);
    }
    pacientes(){
      this.router.navigate(['admin', 'pacientes']);
    }

    ngOnDestroy(): void {

    }
  

}

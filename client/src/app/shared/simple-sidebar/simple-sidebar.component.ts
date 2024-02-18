import { Component,OnDestroy, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import config from 'config/config';
import Swal from 'sweetalert2';
import { ModalsService } from 'src/app/core/services/modals.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { Subject, takeUntil } from 'rxjs';
import { jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';



@Component({
  selector: 'app-simple-sidebar',
  templateUrl: './simple-sidebar.component.html',
  styleUrls: ['./simple-sidebar.component.css']
})

export class SimpleSidebarComponent implements OnInit,  OnDestroy {
  cedulaSeleccionada: string = '';
  private destroy$ = new Subject<any>();
  tokenData: any;


  constructor(
    private cookieService: CookieService, 
    private srvModals:ModalsService,
    private srvUser:AddUserService,
    private router: Router) { }


  editarUsuario(): void {
    // Obtener el token desde la cookie
    const tokenCookie = this.cookieService.get('token');
  
    console.log('Token de la cookie:', tokenCookie);
  
    if (tokenCookie) {
      try {
        // Decodificar el token
        const decodedToken: any = jwtDecode(tokenCookie);
        console.log('Token decodificado:', decodedToken);
        // Obtener la cédula desde los datos decodificados
        const cedula = decodedToken.cedula;
  
        // Realizar las operaciones con la cédula
        this.srvUser.getUsuario(cedula)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe({
            next: (data) => {
              //console.log(data);
              this.srvUser.setConfirmEditProfile(data);
            },
            error: (error) => {
              console.log(error);
            }
          });
      } catch (error) {
        console.log('Error al decodificar el token:', error);
      }
    } else {
      console.log('No se encontró el token en la cookie.');
    }
  }

  ngOnInit(): void {
    this.getTokenData();

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

  listarPacientes(): string {
    if (this.tokenData.rol === 'Administrador') {
      return 'admin/pacientes';
    } else if (this.tokenData.rol === 'Medico') {
      return 'medicos/pacientes';
    } else {
      // Puedes manejar otro caso o redirigir a una ruta predeterminada si es necesario
      return 'ruta-predeterminada';
    }
  }

  listarRecetas(): string {
    if (this.tokenData.rol === 'Administrador') {
      return 'admin/recetas';
    } else if (this.tokenData.rol === 'Medico') {
      return 'medicos/recetas';
    } else if (this.tokenData.rol === 'Farmacia') {
      return 'farmacias/recetas';
    }else{
      // Puedes manejar otro caso o redirigir a una ruta predeterminada si es necesario
      return 'ruta-predeterminada';
    }
  }

  addReceta(cedula: string): void {
    this.srvUser.getUsuario(cedula)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.srvUser.setConfirmEdit(data);
        this.router.navigate(['pacientes', 'mis_recetas']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }
  

  logout() {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar la cookie con nombre "token"
        this.cookieService.delete('token');
        window.location.href = config.URL_BASE_PATH + '/login';
      }
    });

    
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}



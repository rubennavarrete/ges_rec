import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import config from 'config/config';
import { ModalsService } from 'src/app/core/services/modals.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { Subject, takeUntil } from 'rxjs';
import { jwtDecode} from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.css']
})
export class SimpleHeaderComponent implements OnInit,  OnDestroy {

  cedulaSeleccionada: string = '';
  private destroy$ = new Subject<any>();

  constructor(
    private cookieService: CookieService, 
    private srvModals:ModalsService,
    private srvUser:AddUserService) { }

  ngOnInit(): void {
  }



  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }

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

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import config from 'config/config';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import Swal from 'sweetalert2';
import { ModalsService } from 'src/app/core/services/modals.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { Subject, takeUntil } from 'rxjs';
import { jwtDecode} from 'jwt-decode';



@Component({
  selector: 'app-simple-sidebar',
  templateUrl: './simple-sidebar.component.html',
  styleUrls: ['./simple-sidebar.component.css']
})

export class SimpleSidebarComponent implements OnInit,  OnDestroy {
  cedulaSeleccionada: string = '';
  private destroy$ = new Subject<any>();


  constructor(private elementRef: ElementRef,
    private srvSideBar: SidebarService,
    private cookieService: CookieService, 
    private router: Router,
    private srvModals:ModalsService,
    private srvUser:AddUserService) { }

  isSidebarOpen: boolean = false;
  isDropdownPagesOpen = false;
  isDropdownSalesOpen = false;

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

    console.log('1 ->', this.isSidebarOpen)
    let buttonSidebar = document.getElementById('toggle-sidebar')
    let pContainer = document.querySelector('.pContainer');
    let sidebarBody = document.querySelector(".sidebar");
    let sidebarA = document.querySelector('.link-opcion');
    let settings = document.querySelector('.settings');


    sidebarA?.classList.remove('close')
    pContainer?.classList.remove('close')
    settings?.classList.remove('close')
    buttonSidebar?.classList.remove('close')
    sidebarBody?.classList.remove('close')
    this.srvSideBar.getBool(false)

    if (window.innerWidth < 640) {
      console.log('2 ->', this.isSidebarOpen)

      console.log("window.innerWidth < 768")
      let pAside = document.querySelector(".pAside")
      pAside?.classList.toggle('close');
    console.log('3 ->', this.isSidebarOpen)

    }
    else {
      const sidebar = document.getElementById('pSidebar')
      const aside = document.getElementById('idAside')

    console.log('4 ->', this.isSidebarOpen)
      

      if (this.isSidebarOpen === false) {
        aside?.classList.remove('close')
    console.log('5 ->', this.isSidebarOpen)

      } else {
        aside?.classList.toggle('close')
    console.log('6 ->', this.isSidebarOpen)

      }

      this.srvSideBar.getBool(this.isSidebarOpen)
    console.log('7 ->', this.isSidebarOpen)

    }
  }

  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }
  
  editarPerfil(cedula: string): void {
    
  }
  toggleSidebar() {
    console.log('8 ->', this.isSidebarOpen)

    this.isSidebarOpen = !this.isSidebarOpen;
    const dividAside = document.querySelector('#idAside') as HTMLDivElement
    let buttonSidebar = document.getElementById('toggle-sidebar')
    let pContainer = document.querySelector('.pContainer');
    let sidebarBody = document.querySelector(".sidebar");
    let sidebarA = document.querySelector('.link-opcion');
    let settings = document.querySelector('.settings');
    let pAside = document.querySelector(".pAside")

    pAside?.classList.toggle('close');

    console.log('9 ->', this.isSidebarOpen)


    if (window.innerWidth < 768) {
    console.log('10 ->', this.isSidebarOpen)

      console.log("window.innerWidth < 768")
      let pAside = document.querySelector(".pAside")
      let content = document.querySelector(".content")
      content?.classList.toggle("closeC")
      // pAside?.classList.toggle('close');
      console.log('11 ->', this.isSidebarOpen)


    } else {
      // let pAside = document.querySelector(".pAside")

      // pAside?.classList.toggle('close');

      console.log('12 ->', this.isSidebarOpen)

      const sidebar = document.getElementById('pSidebar')
      const aside = document.getElementById('idAside')

      if (this.isSidebarOpen === true) {
        aside?.classList.remove('close')
    console.log('13 ->', this.isSidebarOpen)

      } else {
        aside?.classList.toggle('close')
    console.log('14 ->', this.isSidebarOpen)

      }

      this.srvSideBar.getBool(this.isSidebarOpen)
    console.log('15 ->', this.isSidebarOpen)

    }

    if (dividAside.classList.contains('close')) {
    console.log('16 ->', this.isSidebarOpen)

      sidebarA?.classList.remove('close')
      pContainer?.classList.remove('close')
      settings?.classList.remove('close')
      buttonSidebar?.classList.remove('close')
      sidebarBody?.classList.remove('close')
      this.srvSideBar.getBool(false)
      console.log('17 ->', this.isSidebarOpen)


    } else {

      console.log('18 ->', this.isSidebarOpen)

      sidebarA?.classList.toggle('close')
      pContainer?.classList.toggle('close')
      settings?.classList.toggle('close')
      buttonSidebar?.classList.toggle('close')
      sidebarBody?.classList.toggle('close')
      this.srvSideBar.getBool(true)
    console.log('19 ->', this.isSidebarOpen)


    }
  }

  dropdownsOpen: { [key: string]: boolean } = {};

  toggleDropdown(id: string) {
    this.dropdownsOpen[id] = !this.dropdownsOpen[id];
  }

  isDropdownOpen(id: string) {
    return this.dropdownsOpen[id];
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



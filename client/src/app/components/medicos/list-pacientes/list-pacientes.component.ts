import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-pacientes',
  templateUrl: './list-pacientes.component.html',
  styleUrls: ['./list-pacientes.component.css']
})
export class ListPacientesComponent implements OnInit, OnDestroy{
  
  elementPagina: {
    dataLength: number,
    metaData: number,
    currentPage: number
  } = {
      dataLength: 0,
      metaData: 0,
      currentPage: 0
    }

  currentPage = 1;
  metadata: any;
  mapFiltersToRequest: any = {};


  cedulaSeleccionada: string = '';
  private destroy$ = new Subject<any>();
  

  dataUser: any;

  constructor(public srvUser: AddUserService, public srvPaginacion: PaginacionService, public srvModals: ModalsService, private router: Router) { }

  ngOnInit(): void {
    this.pasarPagina(1)
    this.srvUser.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.getPacientes({}); 
        }
      }
    });

  }


  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }
  
  getPacientes(usuario: any) {
    this.srvUser.getPacientes(usuario)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data: any) => {
        //console.log(data);
        this.srvUser.dataU = data.body
        this.metadata = data.total
        this.dataUser = data.body;
        this.dataPagina()
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  @ViewChild('dropdownActionButton', { static: false}) dropdownActionButton: ElementRef | undefined;

changeUser(event: any) {
  this.mapFiltersToRequest.data = event.target.value;
  this.mapFiltersToRequest.parameter = 'str_cedula';
  this.getPacientes(this.mapFiltersToRequest);
}

changeEstadoA() {
  this.mapFiltersToRequest.data = 'true';
  this.mapFiltersToRequest.parameter = 'bln_estado'; // O el nombre correcto del parámetro en tu backend
  this.getPacientes(this.mapFiltersToRequest);
  if (this.dropdownActionButton) {
    this.dropdownActionButton.nativeElement.innerText = 'Estado: Activo';
  }
}
changeEstadoI() {
  this.mapFiltersToRequest.data = 'false';
  this.mapFiltersToRequest.parameter = 'bln_estado'; // O el nombre correcto del parámetro en tu backend
  this.getPacientes(this.mapFiltersToRequest);
  if (this.dropdownActionButton) {
    this.dropdownActionButton.nativeElement.innerText = 'Estado: Inactivo';
  }
}

limpiarFiltro() {
  this.mapFiltersToRequest.data = 'all';
  this.mapFiltersToRequest.parameter = 'bln_estado'; // O el nombre correcto del parámetro en tu backend
  this.getPacientes(this.mapFiltersToRequest);
  if (this.dropdownActionButton) {
    this.dropdownActionButton.nativeElement.innerText = 'Estado: Todos';
     // Desmarcar los radio buttons
     const radioActivo = document.getElementById('default-radio-4') as HTMLInputElement;
     const radioInactivo = document.getElementById('default-radio-5') as HTMLInputElement;
 
     if (radioActivo && radioInactivo) {
       radioActivo.checked = false;
       radioInactivo.checked = false;
     }
  }
}


  editarUsuario(cedula: string): void {
    this.srvUser.getUsuario(cedula)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        console.log(data);
        this.srvUser.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addReceta(cedula: string): void {
    this.srvUser.getUsuario(cedula)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.srvUser.setConfirmEdit(data);
        this.router.navigate(['admin', 'diagnosticos']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  activarUsuario(cedula: string): void {
    Swal.fire({
      title: '¿Está seguro de activar el usuario?',
      text: 'El usuario se activará correctamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, activar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos activando el usuario',
          icon: 'info',
          allowOutsideClick: false
        });
        this.srvUser.activarUsuario(cedula).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (data: any) => {
            if(data.status == "success"){
              Swal.close();
              Swal.fire({
                title: 'Usuario activado',
                text: 'El usuario se ha activado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'El usuario no se ha activado correctamente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.changeEstadoA();
            console.log('complete');
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }

  eliminarUsuario(cedula: string): void {
    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      text: 'No podrá recuperar los datos del usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos eliminando el usuario',
          icon: 'info',
          allowOutsideClick: false
        });
        this.srvUser.deleteUsuario(cedula).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (data: any) => {
            if(data.status == "success"){
              Swal.close();
              Swal.fire({
                title: 'Usuario eliminado',
                text: 'El usuario se ha eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'El usuario no se ha eliminado correctamente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.changeEstadoA();
            console.log('complete');
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }

  dataPagina() {
    this.elementPagina.dataLength = this.srvUser.dataU ? this.srvUser.dataU.length : 0;
    this.elementPagina.metaData = this.metadata;
    this.elementPagina.currentPage = this.mapFiltersToRequest.page
    this.srvPaginacion.setPagination(this.elementPagina)
  }

  pasarPagina(page: number) {
    this.mapFiltersToRequest = { size: 10, page, parameter: '', data: 0  };
    // console.log('mapFiltersToRequest', this.mapFiltersToRequest);
    this.getPacientes(this.mapFiltersToRequest);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}

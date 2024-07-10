import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { AddRecetaService } from 'src/app/core/services/add-receta.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-recetas',
  templateUrl: './list-recetas.component.html',
  styleUrls: ['./list-recetas.component.css']
})
export class ListRecetasComponent implements OnInit, OnDestroy {

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

  dataReceta: any[] = [];
  id_usuario: number = 0;
  cedulaSeleccionada: string = '';
  tokenData: any;
  private destroy$ = new Subject<any>();

  

  constructor (public srvReceta:AddRecetaService, 
              public srvUser:AddUserService, 
              public srvPaginacion: PaginacionService, 
              public srvModals: ModalsService, 
              public srvRec: AddRecetaService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    initFlowbite();
    this.getTokenData();
    this.pasarPagina(1)
    this.srvReceta.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.getRecetas({size: 10, page: 1, parameter: '', data: 0});
      },
      error: (err) => {
        console.log(err);
      }
    });
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



  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }

  getRecetas(receta: any) {
    this.srvReceta.getRecetas(receta)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data:any) => {
        this.srvReceta.dataR = data.body;
        this.metadata = data.total;
        this.dataReceta = data.body;
        this.dataPagina();

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
    this.getRecetas(this.mapFiltersToRequest);
  }
  
  changeEstadoA() {
    this.mapFiltersToRequest.data = 'true';
    this.mapFiltersToRequest.parameter = 'bln_vigencia'; // O el nombre correcto del parámetro en tu backend
    this.getRecetas(this.mapFiltersToRequest);
    if (this.dropdownActionButton) {
      this.dropdownActionButton.nativeElement.innerText = 'Vigencia: Activo';
    }
  }
  changeEstadoI() {
    this.mapFiltersToRequest.data = 'false';
    this.mapFiltersToRequest.parameter = 'bln_vigencia'; // O el nombre correcto del parámetro en tu backend
    this.getRecetas(this.mapFiltersToRequest);
    if (this.dropdownActionButton) {
      this.dropdownActionButton.nativeElement.innerText = 'Vigencia: Inactivo';
    }
  }
  
  limpiarFiltro() {
    this.mapFiltersToRequest.data = 'all';
    this.mapFiltersToRequest.parameter = 'bln_estado'; // O el nombre correcto del parámetro en tu backend
    this.getRecetas(this.mapFiltersToRequest);
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

  dataPagina() {
    this.elementPagina.dataLength = this.srvReceta.dataR ? this.srvReceta.dataR.length : 0;
    this.elementPagina.metaData = this.metadata;
    this.elementPagina.currentPage = this.mapFiltersToRequest.page
    this.srvPaginacion.setPagination(this.elementPagina)
  }

  pasarPagina(page: number) {
    this.mapFiltersToRequest = { size: 10, page, parameter: '', data: 0  };
    // console.log('mapFiltersToRequest', this.mapFiltersToRequest);
    this.getRecetas(this.mapFiltersToRequest);
  }

  volverRecetar(id_receta: number): void {
    this.srvRec.getReceta(id_receta)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.srvRec.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editarReceta(id_receta: number): void {
    this.srvRec.getReceta(id_receta)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.srvRec.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  obtenerMedicacion(id_receta:number): void {
    this.srvRec.getMedicamentoReceta(id_receta)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.srvRec.setConfirmEditMed(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getPdfReceta(id_receta: number): void {
    Swal.fire({
      title: 'Descargando receta...',
      text: 'Por favor, espera un momento...',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra un spinner de carga
      }
    });
  
    this.srvRec.getPdfReceta(id_receta)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: any) => {
          Swal.hideLoading(); // Oculta el spinner de carga
          const pdfBase64 = response.data;
          const byteArray = new Uint8Array(
            atob(pdfBase64)
              .split('')
              .map(char => char.charCodeAt(0))
          );
          const file = new Blob([byteArray], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          let fileName = 'Receta.pdf';
          let link = document.createElement('a');
          link.download = fileName;
          link.target = '_blank';
          link.href = fileURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          Swal.close(); // Cierra el SweetAlert una vez que el PDF se ha cargado
          
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al descargar la receta.',
            icon: 'error'
          });
          console.log(error);
        }
      });
  }

  eliminarReceta(id_receta: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar la receta?',
      text: 'No podrá recuperar los datos de la receta',
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
          text: 'Estamos eliminando la receta',
          icon: 'info',
          allowOutsideClick: false
        });
        this.srvRec.deleteReceta(id_receta).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (data: any) => {
            if(data.status == "success"){
              Swal.close();
              Swal.fire({
                title: 'Receta eliminada',
                text: 'La receta se ha eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'La receta no se ha eliminado correctamente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
            this.changeEstadoA();
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }

  activarReceta(id_receta: number): void {
    Swal.fire({
      title: '¿Está seguro de activar a receta?',
      text: 'La receta se activará correctamente',
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
          text: 'Estamos activando la receta',
          icon: 'info',
          allowOutsideClick: false
        });
        this.srvRec.activarReceta(id_receta).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (data: any) => {
            if(data.status == "success"){
              Swal.close();
              Swal.fire({
                title: 'Receta activada',
                text: 'La receta se ha activado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'La receta no se ha activado correctamente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
            this.changeEstadoA();
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

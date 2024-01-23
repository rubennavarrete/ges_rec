import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { initFlowbite } from 'flowbite';
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

  dataReceta: any;
  id_usuario: number = 0;
  cedulaSeleccionada: string = '';



  private destroy$ = new Subject<any>();

  

  constructor (public srvReceta:AddRecetaService, 
              public srvUser:AddUserService, 
              public srvPaginacion: PaginacionService, 
              public srvModals: ModalsService, 
              public srvRec: AddRecetaService) { }

  ngOnInit(): void {
    initFlowbite();
    this.pasarPagina(1)
    this.srvReceta.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.getRecetas({});
      },
      error: (err) => {
        console.log(err);
      }
    });
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
        console.log(data);
        this.srvRec.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  obtenerMedicacion(id_medicacion:number): void {
    this.srvRec.getMedicamentoReceta(id_medicacion)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        console.log(data);
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
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

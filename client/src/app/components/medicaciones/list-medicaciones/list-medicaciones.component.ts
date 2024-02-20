import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Subject, takeUntil } from 'rxjs';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-medicaciones',
  templateUrl: './list-medicaciones.component.html',
  styleUrls: ['./list-medicaciones.component.css']
})
export class ListMedicacionesComponent implements OnInit, OnDestroy {

  medicacionSeleccionada: string = '';

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
  
  dataMed: any[] = [];
  

  private destroy$ = new Subject<any>();

  constructor(public srvMed: AddMedicacionesService,
    public srvPaginacion: PaginacionService,
    public srvModals: ModalsService) { }
  
  ngOnInit(): void { 
    initFlowbite();
    this.pasarPagina(1)
    this.srvMed.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.getMedicaciones({}); 
        }
      }
    });

  }

  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }
  
  getMedicaciones(medicacion: any) {
    this.srvMed.getMedicaciones(medicacion)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data:any) => {
        //console.log(data);
        this.srvMed.dataM = data.body
        this.metadata = data.total
        this.dataMed = data.body;
        this.dataPagina()
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editarMedicacion(id_medicacion:number): void {
    this.srvMed.getMedicacion(id_medicacion)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        /* console.log(data); */
        this.srvMed.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  @ViewChild('dropdownActionButton', { static: false}) dropdownActionButton: ElementRef | undefined;

  changeMed(event: any) {
    this.mapFiltersToRequest.data = event.target.value;
    this.mapFiltersToRequest.parameter = 'str_nombre_comercial';
    this.getMedicaciones(this.mapFiltersToRequest);
  }
  
  changeEstadoA() {
    this.mapFiltersToRequest.data = 'true';
    this.mapFiltersToRequest.parameter = 'bln_vigencia'; // O el nombre correcto del parámetro en tu backend
    this.getMedicaciones(this.mapFiltersToRequest);
    if (this.dropdownActionButton) {
      this.dropdownActionButton.nativeElement.innerText = 'Vigencia: Activo';
    }
  }
  changeEstadoI() {
    this.mapFiltersToRequest.data = 'false';
    this.mapFiltersToRequest.parameter = 'bln_vigencia'; // O el nombre correcto del parámetro en tu backend
    this.getMedicaciones(this.mapFiltersToRequest);
    if (this.dropdownActionButton) {
      this.dropdownActionButton.nativeElement.innerText = 'Vigencia: Inactivo';
    }
  }
  
  limpiarFiltro() {
    this.mapFiltersToRequest.data = 'all';
    this.mapFiltersToRequest.parameter = 'bln_vigencia'; // O el nombre correcto del parámetro en tu backend
    this.getMedicaciones(this.mapFiltersToRequest);
    if (this.dropdownActionButton) {
      this.dropdownActionButton.nativeElement.innerText = 'Vigencia: Todos';
       // Desmarcar los radio buttons
       const radioActivo = document.getElementById('default-radio-4') as HTMLInputElement;
       const radioInactivo = document.getElementById('default-radio-5') as HTMLInputElement;
   
       if (radioActivo && radioInactivo) {
         radioActivo.checked = false;
         radioInactivo.checked = false;
       }
    }
  }
  

  eliminarMedicacion(id_medicacion: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar el Medicamento?',
      text: 'No podrá recuperar los datos del medicamento',
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
          text: 'Estamos eliminando el medicamento',
          icon: 'info',
          allowOutsideClick: false
        });
        this.srvMed.deleteMedicacion(id_medicacion).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (data: any) => {
            if(data.status == "success"){
              Swal.close();
              Swal.fire({
                title: 'Medicamento eliminado',
                text: 'El medicamento se ha eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'El medicamento no se ha eliminado correctamente',
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

  activarMedicacion(id_medicacion: number): void {
    Swal.fire({
      title: '¿Está seguro de activar el medicamento?',
      text: 'El medicamento se activará correctamente',
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
          text: 'Estamos activando el medicamento',
          icon: 'info',
          allowOutsideClick: false
        });
        this.srvMed.activarMedicacion(id_medicacion).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (data: any) => {
            if(data.status == "success"){
              Swal.close();
              Swal.fire({
                title: 'Medicamento activado',
                text: 'El medicamento se ha activado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'El medicamento no se ha activado correctamente',
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
    this.elementPagina.dataLength = this.srvMed.dataM ? this.srvMed.dataM.length : 0;
    this.elementPagina.metaData = this.metadata;
    this.elementPagina.currentPage = this.mapFiltersToRequest.page
    this.srvPaginacion.setPagination(this.elementPagina)
  }

  pasarPagina(page: number) {
    this.mapFiltersToRequest = { size: 10, page, parameter: '', data: 0  };
    console.log('mapFiltersToRequest', this.mapFiltersToRequest);
    this.getMedicaciones(this.mapFiltersToRequest);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}

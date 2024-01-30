import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Subject, takeUntil } from 'rxjs';
import { AddFarmService } from 'src/app/core/services/add-farm.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-farmacias',
  templateUrl: './list-farmacias.component.html',
  styleUrls: ['./list-farmacias.component.css']
})
export class ListFarmaciasComponent implements OnInit, OnDestroy {

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
  
  rucSeleccionado: string = '';
  
  dataFarmacia: any[] = [];  

  private destroy$ = new Subject<any>();
  constructor(public srvFarm: AddFarmService,
    public srvPaginacion: PaginacionService,
    public srvModals: ModalsService) { }
  
  ngOnInit(): void {
    initFlowbite();
    this.pasarPagina(1)
    this.srvFarm.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.getFarmacias({}); 
        }
      }
    });
  }

  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }

  getFarmacias(farmacia: any) {
    this.srvFarm.getFarmacias(farmacia)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data: any) => {
        this.srvFarm.dataF = data.body
        this.metadata = data.total
        this.dataFarmacia = data.body;
        this.dataPagina()
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  @ViewChild('dropdownActionButton', { static: false}) dropdownActionButton: ElementRef | undefined;

  changeFarm(event: any) {
    this.mapFiltersToRequest.data = event.target.value;
    this.mapFiltersToRequest.parameter = 'str_ruc';
    this.getFarmacias(this.mapFiltersToRequest);
  }
  
  changeEstadoA() {
    this.mapFiltersToRequest.data = 'true';
    this.mapFiltersToRequest.parameter = 'bln_estado'; // O el nombre correcto del parámetro en tu backend
    this.getFarmacias(this.mapFiltersToRequest);
    if (this.dropdownActionButton) {
      this.dropdownActionButton.nativeElement.innerText = 'Estado: Activo';
    }
  }
  changeEstadoI() {
    this.mapFiltersToRequest.data = 'false';
    this.mapFiltersToRequest.parameter = 'bln_estado'; // O el nombre correcto del parámetro en tu backend
    this.getFarmacias(this.mapFiltersToRequest);
    if (this.dropdownActionButton) {
      this.dropdownActionButton.nativeElement.innerText = 'Estado: Inactivo';
    }
  }
  
  limpiarFiltro() {
    this.mapFiltersToRequest.data = 'all';
    this.mapFiltersToRequest.parameter = 'bln_estado'; // O el nombre correcto del parámetro en tu backend
    this.getFarmacias(this.mapFiltersToRequest);
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
  

  editarFarmacia(ruc: string): void {
    this.rucSeleccionado = ruc;
    this.srvFarm.getFarmacia(this.rucSeleccionado)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        //console.log(data);
        this.srvFarm.setConfirmEdit(data);
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  dataPagina() {
    this.elementPagina.dataLength = this.srvFarm.dataF ? this.srvFarm.dataF.length : 0;
    this.elementPagina.metaData = this.metadata;
    this.elementPagina.currentPage = this.mapFiltersToRequest.page
    this.srvPaginacion.setPagination(this.elementPagina)
  }

  pasarPagina(page: number) {
    this.mapFiltersToRequest = { size: 10, page, parameter: '', data: 0  };
    console.log('mapFiltersToRequest', this.mapFiltersToRequest);
    this.getFarmacias(this.mapFiltersToRequest);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

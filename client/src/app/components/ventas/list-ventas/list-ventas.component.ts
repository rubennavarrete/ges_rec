import { Component, OnDestroy, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Subject, takeUntil } from 'rxjs';
import { ModalsService } from 'src/app/core/services/modals.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';
import { VentasService } from 'src/app/core/services/ventas.service';

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css']
})
export class ListVentasComponent implements OnInit, OnDestroy {

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
  dataVentas: any[] = [];
  selectedOption: string = 'codigo';

  private destroy$ = new Subject<any>();

  constructor (public srvVentas: VentasService,
    public srvPaginacion: PaginacionService,
    public srvModals: ModalsService) { }

  ngOnInit(): void {
    initFlowbite();
    this.pasarPagina(1)
    this.srvVentas.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.getVentas({}); 
        }
      }
    });
  }

  onSelectChange(event: any) {
    this.selectedOption = event.target.value;
    // Limpiar los inputs al cambiar la opción
    if (this.selectedOption === 'codigo') {
      this.mapFiltersToRequest.fechaInicio = null;
      this.mapFiltersToRequest.fechaFin = null;
    } else {
      this.mapFiltersToRequest.data = null;
    }
  }


  getVentas(filters: any) {
    this.srvVentas.getVentas(filters)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data:any) => {
        //console.log(data);
        this.srvVentas.dataV = data.body
        this.metadata = data.total
        this.dataVentas = data.body;
        this.dataPagina()
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  verVenta(codigo: string): void {
    this.srvVentas.getVentaByCode(codigo)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.srvVentas.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  limpiarFiltro() {
    this.mapFiltersToRequest.data = 'all';
    this.getVentas(this.mapFiltersToRequest);
  }

  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
  }

  changeVen(event: any) {
    this.mapFiltersToRequest.data = event.target.value;
    this.mapFiltersToRequest.parameter = 'str_cod_venta';
    this.getVentas(this.mapFiltersToRequest);
  }

  onFechaInicioChange(event: any) {
    this.mapFiltersToRequest.fechaInicio = event.target.value;
    this.getVentas(this.mapFiltersToRequest);
  }
  
  // Método para manejar el cambio de la fecha de fin
  onFechaFinChange(event: any) {
    this.mapFiltersToRequest.fechaFin = event.target.value;
    this.getVentas(this.mapFiltersToRequest);
  }

  dataPagina() {
    this.elementPagina.dataLength = this.srvVentas.dataV ? this.srvVentas.dataV.length : 0;
    this.elementPagina.metaData = this.metadata;
    this.elementPagina.currentPage = this.mapFiltersToRequest.page
    this.srvPaginacion.setPagination(this.elementPagina)
  }

  pasarPagina(page: number) {
    this.mapFiltersToRequest = { size: 10, page, parameter: '', data: 0  };
    this.getVentas(this.mapFiltersToRequest);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }

}

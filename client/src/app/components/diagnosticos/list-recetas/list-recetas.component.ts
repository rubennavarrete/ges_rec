import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AddRecetaService } from 'src/app/core/services/add-receta.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';

@Component({
  selector: 'app-list-recetas',
  templateUrl: './list-recetas.component.html',
  styleUrls: ['./list-recetas.component.css']
})
export class ListRecetasComponent implements OnInit, OnDestroy {

  recetaSeleccionada: string = '';

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
  dataReceta: any;

  private destroy$ = new Subject<any>();

  

  constructor (public srvReceta:AddRecetaService, public srvUser:AddUserService, public srvPaginacion: PaginacionService, public srvModals: ModalsService) { }

  ngOnInit(): void {
    this.pasarPagina(1)
    this.srvReceta.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.getRecetas({}); 
        }
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
        this.srvReceta.dataR = data.body
        this.metadata = data.total
        this.dataReceta = data.body;
        this.dataPagina();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  changeUser(event: any) {
    this.mapFiltersToRequest.data = event.target.value;
    this.mapFiltersToRequest.parameter = 'int_id_paciente';
    this.getRecetas(this.mapFiltersToRequest);
  }

  addReceta(cedula: string): void {
    this.cedulaSeleccionada = cedula;
    this.srvUser.getUsuario(this.cedulaSeleccionada)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        this.srvUser.setConfirmEdit(data);
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

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

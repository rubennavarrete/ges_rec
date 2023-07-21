import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';

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
  
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  showWindow3: boolean = false;
  showWindow4: boolean = false;
  dataUser: any;

  constructor(public srvUser: AddUserService, public srvPaginacion: PaginacionService) { }


  toggleWindows() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow2 = !this.showWindow2;
  }

  toggleWindows2() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow3 = !this.showWindow3;
  }

  toggleWindows3() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow4 = !this.showWindow4;
  }



  getUsuarios() {
    this.srvUser.getUsuarios(this.mapFiltersToRequest)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data: any) => {
        this.dataUser = data.body;
        this.srvUser.dataU = data.body
        this.metadata = data.total
        this.dataPagina()
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editarUsuario(cedula: string): void {
    this.cedulaSeleccionada = cedula;
    this.srvUser.getUsuario(this.cedulaSeleccionada)
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
    this.cedulaSeleccionada = cedula;
    this.srvUser.getUsuario(this.cedulaSeleccionada)
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

  ngOnInit(): void {
    this.pasarPagina(1)
    this.srvUser.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.showWindow1 = data;
          this.getUsuarios(); 
          this.showWindow2 = !data; 
          this.showWindow3 = !data;
          this.showWindow4 = !data;
        }
      }
    });

    this.getUsuarios();
  }

  dataPagina() {
    this.elementPagina.dataLength = this.srvUser.dataU ? this.srvUser.dataU.length : 0;
    this.elementPagina.metaData = this.metadata;
    this.elementPagina.currentPage = this.mapFiltersToRequest.page
    this.srvPaginacion.setPagination(this.elementPagina)
  }

  pasarPagina(page: number) {
    this.mapFiltersToRequest = { size: 10, page, parameter: '', data: 0  };
    console.log('mapFiltersToRequest', this.mapFiltersToRequest);
    this.getUsuarios();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}

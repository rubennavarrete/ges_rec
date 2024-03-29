import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddUserService } from '../../../core/services/add-user.service';
import { Subject, takeUntil } from 'rxjs';
import { EditUser } from 'src/app/core/models/user';
import { PaginacionService } from 'src/app/core/services/paginacion.service';




@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})


export class ListUserComponent implements OnInit,  OnDestroy {
  
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
  
  
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  showWindow3: boolean = false;
  dataUser: any;
  

  private destroy$ = new Subject<any>();
  constructor(public srvUser: AddUserService,
    public srvPaginacion: PaginacionService) { }
  
  toggleWindows() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow2 = !this.showWindow2;
  }
  toggleWindows2() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow3 = !this.showWindow3;
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
        }
      }
    });

    // this.getUsuarios();

  }
  
  getUsuarios() {
    this.srvUser.getUsuarios(this.mapFiltersToRequest)
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



  editarUsuario(cedula: string): void {
    this.cedulaSeleccionada = cedula;
    this.srvUser.getUsuario(this.cedulaSeleccionada)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        //console.log(data);
        this.srvUser.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
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
    this.getUsuarios();
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}

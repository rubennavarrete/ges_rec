import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddFarmService } from 'src/app/core/services/add-farm.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';

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
  
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  showWindow3: boolean = false;
  dataFarmacia: any;  

  private destroy$ = new Subject<any>();
  constructor(public srvFarm: AddFarmService,
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

    this.srvFarm.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.showWindow1 = data;
          this.getFarmacias(); 
          this.showWindow2 = !data; 
          this.showWindow3 = !data;
        }
      }
    });

    // this.getFarmacias();
  }

  getFarmacias() {
    this.srvFarm.getFarmacias(this.mapFiltersToRequest)
    .subscribe({
      next: (data: any) => {
        // console.log('lo que llega ->', data)
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
    this.getFarmacias();
  }


  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Medicacion } from 'src/app/core/models/medicacion';
import { EditUser, User } from 'src/app/core/models/user';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { PaginacionService } from 'src/app/core/services/paginacion.service';

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
  
  dataMed: any;
  

  private destroy$ = new Subject<any>();

  constructor(public srvMed: AddMedicacionesService,
    public srvPaginacion: PaginacionService,
    public srvModals: ModalsService) { }
  
  ngOnInit(): void { 
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

    /* this.getMedicaciones(); */

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

  changeMed(event: any) {
    this.mapFiltersToRequest.data = event.target.value;
    this.mapFiltersToRequest.parameter = 'str_nombre_generico';
    this.getMedicaciones(this.mapFiltersToRequest);
  }

  editarMedicacion(id_medicacion:number): void {
    this.srvMed.getMedicacion(id_medicacion)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        //console.log(data);
        this.srvMed.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
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

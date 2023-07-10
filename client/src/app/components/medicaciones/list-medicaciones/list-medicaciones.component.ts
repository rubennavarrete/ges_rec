import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Medicacion } from 'src/app/core/models/medicacion';
import { EditUser, User } from 'src/app/core/models/user';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';

@Component({
  selector: 'app-list-medicaciones',
  templateUrl: './list-medicaciones.component.html',
  styleUrls: ['./list-medicaciones.component.css']
})
export class ListMedicacionesComponent implements OnInit, OnDestroy {

  cedulaSeleccionada: string = '';
  
  
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  showWindow3: boolean = false;
  dataMed: any;
  

  private destroy$ = new Subject<any>();
  constructor(public srvMed: AddMedicacionesService) { }
  
  toggleWindows() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow2 = !this.showWindow2;
  }
  toggleWindows2() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow3 = !this.showWindow3;
  }
  ngOnInit(): void { 
    this.srvMed.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.showWindow1 = data;
          this.getMedicaciones(); 
          // this.showWindow2 = !data; 
          this.showWindow3 = !data;
        }
      }
    });

    this.getMedicaciones();

  }
  
  getMedicaciones() {
    this.srvMed.getMedicaciones()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        console.log(data);
        this.dataMed = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  editarMedicacion(int_id_medicacion: number): void {
    this.srvMed.getMedicacion(int_id_medicacion)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        console.log(data);
        this.srvMed.setConfirmEdit(data);
        this.toggleWindows();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}

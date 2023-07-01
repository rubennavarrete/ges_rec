import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AddFarmService } from 'src/app/core/services/add-farm.service';

@Component({
  selector: 'app-list-farmacias',
  templateUrl: './list-farmacias.component.html',
  styleUrls: ['./list-farmacias.component.css']
})
export class ListFarmaciasComponent implements OnInit, OnDestroy {
  
  rucSeleccionado: string = '';
  
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  showWindow3: boolean = false;
  dataFarmacia: any;  

  private destroy$ = new Subject<any>();
  constructor(public srvFarm: AddFarmService) { }
  
  toggleWindows() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow2 = !this.showWindow2;
  }
  toggleWindows2() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow3 = !this.showWindow3;
  }
  ngOnInit(): void {
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

    this.getFarmacias();
  }

  getFarmacias() {
    this.srvFarm.getFarmacias()
    .subscribe({
      next: (data) => {
        this.dataFarmacia = data;
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
        console.log(data);
        this.srvFarm.setConfirmEdit(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

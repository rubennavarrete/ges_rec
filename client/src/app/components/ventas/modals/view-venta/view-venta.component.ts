import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Venta } from 'src/app/core/models/ventas';
import { VentasService } from 'src/app/core/services/ventas.service';

@Component({
  selector: 'app-view-venta',
  templateUrl: './view-venta.component.html',
  styleUrls: ['./view-venta.component.css']
})
export class ViewVentaComponent implements OnInit, OnDestroy{

  
  private destroy$ = new Subject<any>();
  dataVenta: Venta[] = [];
  dataVen: any = [];

  constructor(
    private srvVentas: VentasService,
  ) { }




  ngOnInit(): void {
    this.srvVentas.SeleccionarConfirmEdit$
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => { 
        console.log(data);
        this.dataVen = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }



}

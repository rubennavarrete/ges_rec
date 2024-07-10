import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { Venta } from '../models/ventas';
import { BehaviorSubject, Observable } from 'rxjs';

const confirmAdd:boolean = false;


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  dataV!: any[]
  

  private URL_API: string = config.URL_API_BASE + 'ventas';

  constructor(private http: HttpClient) { }


   //BEHAVIOR SUBJECT
   private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);

   //METODOS

   get SeleccionarConfirmAdd$(): Observable<boolean> {
    return this.confirmAdd$.asObservable();
  }

  getVentas(pagination:any) {
    const params = new HttpParams()
        .set('page', pagination.page)
        .set('size', pagination.size)
        .set('parameter', pagination.parameter)
        .set('data', pagination.data);
    
      return this.http.get<Venta>(this.URL_API + '?' +params,
        {
          withCredentials: true,
        }
        );
  }
}

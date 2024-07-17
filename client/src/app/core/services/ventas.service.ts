import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { Venta, VentaResponse } from '../models/ventas';
import { BehaviorSubject, Observable } from 'rxjs';

const confirmAdd:boolean = false;
const confirmEdit: Venta = {
  dt_fecha_venta: '',
    str_cod_venta: '',
    float_total: 0,
    str_nombre_comercial: '',
    str_forma_farmaceutica : '',
    int_vendidos : 0,
    float_subtotal : 0,
    float_precio : 0
};



@Injectable({
  providedIn: 'root'
})
export class VentasService {

  dataV!: any[]
 
  

  private URL_API: string = config.URL_API_BASE + 'ventas';

  constructor(private http: HttpClient) { }


   //BEHAVIOR SUBJECT
   private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);
   private confirmEdit$ = new BehaviorSubject<Venta>(confirmEdit);


   //METODOS

   get SeleccionarConfirmAdd$(): Observable<boolean> {
    return this.confirmAdd$.asObservable();
  }

  setConfirmEdit(data: Venta): void {
    this.confirmEdit$.next(data);
    console.log(data);
  }

  get SeleccionarConfirmEdit$(): Observable<Venta> {
    return this.confirmEdit$.asObservable();
  }


  getVentas(pagination: any): Observable<Venta[]> {
    let params = new HttpParams()
      .set('page', pagination.page)
      .set('size', pagination.size)
      .set('parameter', pagination.parameter)
      .set('data', pagination.data);

    // Agregar los parámetros de fecha si están presentes
    if (pagination.fechaInicio) {
      params = params.set('fechaInicio', pagination.fechaInicio);
    }
    if (pagination.fechaFin) {
      params = params.set('fechaFin', pagination.fechaFin);
    }

    return this.http.get<Venta[]>(this.URL_API, { params, withCredentials: true });
  }

  getVentaByCode(codigo: string) {
    return this.http.get<Venta>(`${this.URL_API}/${codigo}`);
  }
}

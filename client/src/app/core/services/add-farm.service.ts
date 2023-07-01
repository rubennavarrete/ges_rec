import { Injectable } from '@angular/core';
import { DataFarm, EditFarm, Farm } from '../models/farm';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



const confirmAdd:boolean = false;
const confirmEdit:EditFarm = {
  str_ruc: '',
  str_nombre_institucion: '',
  txt_direccion_institucion: '',
  str_correo_institucion: '',
  str_password: '',
  str_telefono_institucion: '',
  str_nombre_representante: '',
  str_celular_representante: '',
  int_id_rol: 0,
};
@Injectable({
  providedIn: 'root'
})
export class AddFarmService {
  URL_API = 'http://localhost:4000/farmacias';

  //BEHAVIOR SUBJECT
  private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);
  private confirmEdit$ = new BehaviorSubject<EditFarm>(confirmEdit);

  //METODOS
  get SeleccionarConfirmAdd$(): Observable<boolean> {
    return this.confirmAdd$.asObservable();
  }

  setConfirmAdd(data: boolean): void {
    this.confirmAdd$.next(data);
  }

  //METODO PARA ENVIAR DATOS AL COMPONENTE EDITAR FARMACIA
  
  get SeleccionarConfirmEdit$(): Observable<EditFarm> {
    return this.confirmEdit$.asObservable();
  }

  setConfirmEdit(data: EditFarm): void {
    this.confirmEdit$.next(data);
  }

  constructor(private http: HttpClient) { }

  getFarmacias() {
    return this.http.get<EditFarm[]>(this.URL_API);
  }

  getFarmacia(ruc: string) {
    return this.http.get<EditFarm>(`${this.URL_API}/${ruc}`);
  }

  postFarmacia(dataFormFarm: Farm): Observable<DataFarm> {
    return this.http.post<DataFarm>(this.URL_API, dataFormFarm);
  }

  putFarmacia(dataFormFarm: Farm) {
    return this.http.put<DataFarm>(`${this.URL_API}/${dataFormFarm.ruc}`, dataFormFarm);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditMedicacion, Medicacion, MedicacionResponse } from '../models/medicacion';
import config from 'config/config';



const confirmAdd: boolean = false;
const confirmEdit: EditMedicacion = {
  int_id_medicacion: 0,
  str_nombre_comercial: '',
  str_nombre_generico: ''
};

@Injectable({
  providedIn: 'root'
})
export class AddMedicacionesService {
  private URL_API: string = config.URL_API_BASE + 'medicaciones';

  //BEHAVIOR SUBJECT
  private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);
  private confirmEdit$ = new BehaviorSubject<EditMedicacion>(confirmEdit);

  //METODOS
  get SeleccionarConfirmAdd$(): Observable<boolean> {
    return this.confirmAdd$.asObservable();
  }

  setConfirmAdd(data: boolean): void {
    this.confirmAdd$.next(data);
  }


  //METODO PARA ENVIAR DATOS AL COMPONENTE EDITAR USUARIO
  get SeleccionarConfirmEdit$(): Observable<EditMedicacion> {
    return this.confirmEdit$.asObservable();
  }

  setConfirmEdit(data: EditMedicacion): void {
    this.confirmEdit$.next(data);
  }

  constructor(private http: HttpClient) { }

  getMedicaciones() {
    return this.http.get<Medicacion[]>(this.URL_API);
  }

  getMedicacion(id_medicacion: number) {
    return this.http.get<Medicacion>(`${this.URL_API}/${id_medicacion}`);
  }

  postMedicacion(dataFormMed: Medicacion) {
    return this.http.post<MedicacionResponse>(`${this.URL_API}`, dataFormMed);
  }

  updateMedicacion(dataFormMed: Medicacion) : Observable<MedicacionResponse> {
    return this.http.put<MedicacionResponse>(`${this.URL_API}/${dataFormMed.id_medicacion}`, dataFormMed);
  }
  

}

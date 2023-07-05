import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medicamentos, Receta, RecetaResponse } from '../models/receta';
import { EditUser } from '../models/user';


const confirmAdd:boolean = false;
const confirmEdit:EditUser = {
  int_id_usuario: 0,
  str_cedula: '',
  str_nombres: '',
  str_apellidos: '',
  str_correo: '',
  str_password: '',
  dt_fecha_nac: new Date(),
  bln_genero: false,
  str_telefono: '',
  str_celular: '',
  txt_direccion: ''
};

@Injectable({
  providedIn: 'root'
})
export class AddRecetaService {

  URL_API = 'http://localhost:4000/recetas';

  constructor(private http: HttpClient) { }

    //BEHAVIOR SUBJECT
    private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);
    private confirmEdit$ = new BehaviorSubject<EditUser>(confirmEdit);

    //METODOS

    get SeleccionarConfirmAdd$(): Observable<boolean> {
      return this.confirmAdd$.asObservable();
    }

    setConfirmAdd(data: boolean): void {
      this.confirmAdd$.next(data);
    }
  

    postReceta(dataFormReceta: Receta): Observable<RecetaResponse> {
      return this.http.post<RecetaResponse>(this.URL_API, dataFormReceta);
    }


  }

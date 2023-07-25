import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';
import { Receta, RecetaResponse } from '../models/receta';
import { EditUser } from '../models/user';
import config from 'config/config';
import { Medicacion, MedicacionResponse } from '../models/medicacion';


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

  private URL_API: string = config.URL_API_BASE + 'recetas';
  private URL_API2: string = config.URL_API_BASE + 'medicacion/busqueda?nombre';

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
  
    //ENVIAR RECETA

    postReceta(dataFormReceta: Receta): Observable<RecetaResponse> {
      return this.http.post<RecetaResponse>(this.URL_API, dataFormReceta);
    }

    //RECIBIR MEDICAMENTOS

    getMedicamentos(nombre : string):Observable<Medicacion[]>{
      return this.http.get<MedicacionResponse>(`${this.URL_API2}=${nombre}`).pipe(
        map((res:MedicacionResponse)=> res?.data),
        catchError(() => EMPTY)
      );
    }
    

  }

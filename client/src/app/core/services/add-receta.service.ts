import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';
import { EditReceta, Receta, RecetaResponse } from '../models/receta';
import { EditUser } from '../models/user';
import config from 'config/config';
import { Medicacion, MedicacionResponse } from '../models/medicacion';


const confirmAdd:boolean = false;
const confirmEdit: EditReceta = {
  int_id_paciente: 0,
  int_id_medico: 0,
  txt_diagnostico: '',
  medicamentos: []
};

@Injectable({
  providedIn: 'root'
})
export class AddRecetaService {
  dataR!: any[];
  private URL_API: string = config.URL_API_BASE + 'recetas';
  private URL_API2: string = config.URL_API_BASE + 'receta';

  constructor(private http: HttpClient) { }


    //BEHAVIOR SUBJECT
    private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);
    private confirmEdit$ = new BehaviorSubject<EditReceta>(confirmEdit);

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

    //RECIBIR RECETA

    getRecetas(pagination: any) {
      const params = new HttpParams()
        .set('page', pagination.page)
        .set('size', pagination.size)
        .set('parameter', pagination.parameter)
        .set('data', pagination.data);
  
      return this.http.get<Receta>(this.URL_API + '?' + params, {
        withCredentials: true,
      });
    }

    //RECIBIR MEDICAMENTOS

    getMedicamentos(nombre : string):Observable<Medicacion[]>{
      return this.http.get<MedicacionResponse>(`${this.URL_API2}=${nombre}`).pipe(
        map((res:MedicacionResponse)=> res?.data),
        catchError(() => EMPTY)
      );
    }
    

  }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';
import { EditReceta, Medicamentos, Receta, RecetaResponse } from '../models/receta';
import { EditUser } from '../models/user';
import config from 'config/config';
import { Medicacion, MedicacionResponse } from '../models/medicacion';


const confirmAdd:boolean = false;
const confirmEdit: EditReceta = {
  int_id_paciente: 0,
  int_id_medico: 0,
  txt_diagnostico: '',
};
const confirmEditMed: Medicamentos = {
  int_id_medicacion: 0,
  str_nombre_comercial: '',
  str_cantidad: '',
  str_dosis: '',
  str_duracion: '',
  txt_indicaciones: '',
  id_medicacion: 0,
  nombre: '',
  cantidad: '',
  dosis: '',
  duracion: '',
  indicaciones: '',
};

@Injectable({
  providedIn: 'root'
})
export class AddRecetaService {
  dataR!: any[];
  private URL_API: string = config.URL_API_BASE + 'recetas';
  private URL_API2: string = config.URL_API_BASE + 'receta';
  private URL_API3: string = config.URL_API_BASE + 'recetaSearch';
  private URL_API4: string = config.URL_API_BASE + 'medicacion';
  

  constructor(private http: HttpClient) { }


    //BEHAVIOR SUBJECT
    private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);
    private confirmEdit$ = new BehaviorSubject<EditReceta>(confirmEdit);
    private confirmEditMed$ = new BehaviorSubject<Medicamentos>(confirmEditMed);

    //METODOS

    get SeleccionarConfirmAdd$(): Observable<boolean> {
      return this.confirmAdd$.asObservable();
    }

    setConfirmAdd(data: boolean): void {
      this.confirmAdd$.next(data);
    }

    //METODO PARA ENVIAR DATOS AL COMPONENTE VOLVER A RECETAR

    get SeleccionarConfirmEdit$(): Observable<EditReceta> {
      return this.confirmEdit$.asObservable();
    }
    setConfirmEdit(data: EditReceta): void {
      this.confirmEdit$.next(data);
    }

    get SeleccionarConfirmEditMed$(): Observable<Medicamentos> {
      return this.confirmEditMed$.asObservable();
    }
    setConfirmEditMed(data: Medicamentos): void {
      this.confirmEditMed$.next(data);
    }

    
  
    //ENVIAR RECETA

    postReceta(dataFormReceta: Receta) {
      return this.http.post<RecetaResponse>(`${this.URL_API}`, dataFormReceta);
    }

    //RECIBIR RECETAS

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

    //RECIBIR UNA RECETA

    getReceta(id_receta: number){
      return this.http.get<Receta>(`${this.URL_API3}/${id_receta}`);
    }

    //RECIBIR MEDICAMENTO DE LA RECETA
    getMedicamentoReceta(id_receta: number){
      return this.http.get<Medicamentos>(`${this.URL_API2}/${id_receta}`);
    }

    //RECIBIR MEDICAMENTOS

    getMedicamentos(nombre : string):Observable<Medicacion[]>{ 
      return this.http.get<MedicacionResponse>(`${this.URL_API4}/busqueda?nombre=${nombre}`).pipe(
        map((res:MedicacionResponse)=> res?.data),
        catchError(() => EMPTY)
      );
    }

  }

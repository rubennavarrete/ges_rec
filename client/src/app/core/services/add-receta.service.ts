import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';
import { EditReceta, Medicamentos, Receta, RecetaResponse } from '../models/receta';
import config from 'config/config';
import { Medicacion, MedicacionResponse } from '../models/medicacion';
import { DomSanitizer } from '@angular/platform-browser';



const confirmAdd:boolean = false;
const confirmEdit: EditReceta = {
  int_id_receta: 0,
  int_id_paciente: 0,
  int_id_medico: 0,
  txt_diagnostico: '',
  str_cie: '',
  txt_nota: '',
};
const confirmEditMed: Medicamentos = {
  int_id_medicacion: 0,
  str_nombre_comercial: '',
  int_cantidad: 0,
  int_vendidos: 0,
  str_dosis: '',
  str_tipo: '',
  txt_indicaciones: '',
  id_medicacion: 0,
  nombre: '',
  cantidad: 0,
  vendidos: 0,
  dosis: '',
  tipo: '',
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
  private URL_API5: string = config.URL_API_BASE + 'pdf';
  

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }



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


    //RECIBIR RECETAS DEL PACIENTE
    getRecetasPaciente(id_paciente: number) {
      return this.http.get<Receta>(`${this.URL_API}/${id_paciente}`);
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

    //RECIBIR PDF RECETA

    getPdfReceta(id_receta: number): Observable<any>{
      return this.http.get(`${this.URL_API5}/${id_receta}`);
    }

    //ACTUALIZARE RECETA


    updateReceta(dataFormReceta: Receta): Observable<RecetaResponse> {
      return this.http.put<RecetaResponse>(
        `${this.URL_API}/${dataFormReceta.id_receta}`,
        dataFormReceta)
      }

      venderReceta(dataFormReceta: Receta): Observable<RecetaResponse> {
        return this.http.put<RecetaResponse>(
          `${this.URL_API}/ventas/${dataFormReceta.id_receta}`,
          dataFormReceta)
        }


    //ACTIVAR RECETA
    activarReceta(id_receta: number) {
      return this.http.put(`${this.URL_API}/activar/${id_receta}`, null);
    }


    //DESACTIVAR RECETA
    deleteReceta(id_receta: number) {
      return this.http.put(`${this.URL_API}/desactivar/${id_receta}`, null);
    }
  }

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUser, User, EditUser } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import config from 'config/config';

const confirmAdd: boolean = false;
const confirmEdit: EditUser = {
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
  txt_direccion: '',
};

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  dataU!: any[];

  private URL_API: string = config.URL_API_BASE + 'usuarios';

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

  //METODO PARA ENVIAR DATOS AL COMPONENTE EDITAR USUARIO
  get SeleccionarConfirmEdit$(): Observable<EditUser> {
    return this.confirmEdit$.asObservable();
  }

  setConfirmEdit(data: EditUser): void {
    this.confirmEdit$.next(data);
  }

  constructor(private http: HttpClient) {}

  // getUsuarios() {
  //   return this.http.get<User[]>(this.URL_API);
  // }

  getUsuarios(pagination: any) {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('size', pagination.size)
      .set('parameter', pagination.parameter)
      .set('data', pagination.data);

    return this.http.get<User>(this.URL_API + '?' + params, {
      withCredentials: true,
    });
  }

  getUsuario(cedula: string) {
    return this.http.get<User>(`${this.URL_API}/${cedula}`);
  }

  postUsuario(dataFormUser: User): Observable<DataUser> {
    return this.http.post<DataUser>(this.URL_API, dataFormUser);
  }

  updateUsuario(dataFormUser: User): Observable<DataUser> {
    return this.http.put<DataUser>(
      `${this.URL_API}/${dataFormUser.cedula}`,
      dataFormUser
    );
  }
}

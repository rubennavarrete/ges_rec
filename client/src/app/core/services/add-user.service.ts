import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUser, User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from '@angular/router';


const confirmAdd:boolean = false;

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  URL_API = 'http://localhost:4000/usuarios';

  //BEHAVIOR SUBJECT
  private confirmAdd$ = new BehaviorSubject<boolean>(confirmAdd);

  //METODOS
  get SeleccionarConfirmAdd$(): Observable<boolean> {
    return this.confirmAdd$.asObservable();
  }

  setConfirmAdd(data: boolean): void {
    this.confirmAdd$.next(data);
  }

  constructor( private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<User[]>(this.URL_API);
  }

  postUsuario(dataFormUser: User): Observable<DataUser> {
    return this.http.post<DataUser>(this.URL_API, dataFormUser);
  }
}

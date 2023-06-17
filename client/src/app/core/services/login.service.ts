import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataLogin, DataFormLogin } from '../models/login';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_API = 'http://localhost:4000/login';

  constructor( private http: HttpClient) {}

  getLogin(dataFormLogin: DataFormLogin): Observable<DataLogin> {
    return this.http.post<DataLogin>(this.URL_API, dataFormLogin);
  }


}

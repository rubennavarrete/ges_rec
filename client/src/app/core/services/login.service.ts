import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest, DataLogin} from '../models/login';
import { Observable } from 'rxjs';
import config from 'config/config';




@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL_API: string = config.URL_API_BASE + 'login';

  constructor( private http: HttpClient) {}

  getLogin(dataFormLogin: LoginRequest): Observable<DataLogin> {
    return this.http.post<DataLogin>(this.URL_API, dataFormLogin)
  }
}
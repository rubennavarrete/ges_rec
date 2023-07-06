import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest} from '../models/login';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { DataLogin } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_API = 'http://localhost:4000/login';

  constructor( private http: HttpClient) {}

  getLogin(dataFormLogin: LoginRequest): Observable<DataLogin> {
    return this.http.post<DataLogin>(this.URL_API, dataFormLogin)
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest} from '../models/login';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';


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
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataLogin, LoginRequest} from '../models/login';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_API = 'http://localhost:4000/login';

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: BehaviorSubject<DataLogin> = new BehaviorSubject<DataLogin>({success: true});
  

  constructor( private http: HttpClient) {}

  getLogin(dataFormLogin: LoginRequest): Observable<DataLogin> {
    return this.http.post<DataLogin>(this.URL_API, dataFormLogin).pipe(
      tap((data: DataLogin) => {
        if(data.success){
          this.currentUserLoginOn.next(true);
          this.currentUser.next(data);
        }
      }),
    );
    catchError(this.handleError)
  }



  private handleError(error: HttpErrorResponse) {
    if(error.status === 0){
      console.log('An error occurred:', error.error);
    }else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Error de conexion'));
  }
}

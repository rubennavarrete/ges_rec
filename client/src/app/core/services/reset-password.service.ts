import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from 'config/config';
import { Change, ChangeResponse, Reset, ResetResponse } from '../models/login';
import { CookieService } from 'ngx-cookie-service'; // 

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private URL_API: string = config.URL_API_BASE + 'reset_password';

constructor(private http: HttpClient, private cookieService: CookieService) { }

resetPassword(dataFormResetPassword: Reset): Observable<ResetResponse> {
  return this.http.post<ResetResponse>(this.URL_API, dataFormResetPassword)
}

changePassword(dataFormChangePassword: Change): Observable<ChangeResponse> {
  const token = this.cookieService.get('token'); // Obtén el valor del token de la cookie
  return this.http.post<ChangeResponse>(`${this.URL_API}/${token}`, dataFormChangePassword)
}

}

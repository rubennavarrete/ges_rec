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
  token = this.cookieService.get('tokenReset');

constructor(private http: HttpClient, private cookieService: CookieService) { }

resetPassword(dataFormResetPassword: Reset): Observable<ResetResponse> {
  return this.http.post<ResetResponse>(this.URL_API, dataFormResetPassword)
}

changePassword(dataFormChangePassword: Change): Observable<ChangeResponse> {
   // Obtén el valor del token de la cookie
  return this.http.put<ChangeResponse>(`${this.URL_API}/${this.token}`, dataFormChangePassword)
}

}

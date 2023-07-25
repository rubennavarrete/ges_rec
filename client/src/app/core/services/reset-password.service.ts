import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from 'config/config';
import { Change, ChangeResponse, Reset, ResetResponse } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private URL_API: string = config.URL_API_BASE + 'reset_password';

constructor(private http: HttpClient) { }

resetPassword(dataFormResetPassword: Reset): Observable<ResetResponse> {
  return this.http.post<ResetResponse>(this.URL_API, dataFormResetPassword)
}

changePassword(dataFormChangePassword: Change): Observable<ChangeResponse> {
  return this.http.post<ChangeResponse>(this.URL_API, dataFormChangePassword)
}

}

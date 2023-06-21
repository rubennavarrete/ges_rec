import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUser, User } from '../models/user';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  URL_API = 'http://localhost:4000/dashboard';

  constructor( private http: HttpClient) {}

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_API);
  }

postUser(dataFormUser : User ): Observable <DataUser> {
  return this.http.post<DataUser>(this.URL_API, dataFormUser);
}
}

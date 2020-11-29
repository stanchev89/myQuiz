import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IUser} from '../interfaces';
import {Observable,of} from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
@Injectable()
export class UserService {
  currentUser:IUser | null;
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  register(username,password) {
    return this.http.post<IUser[]>(`${this.apiUrl}/users/register`,{username,password});
  }

  login(username,password): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/users/login`,[{username,password},{ withCredentials: true }]).pipe(
      tap((user:IUser): void => {
        this.currentUser = user;
      }),catchError(()=> {
        this.currentUser = null ;
        return of (null);
      })
    )
  }
}

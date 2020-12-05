import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IUser} from '../interfaces';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class UserService {

  currentUser: IUser | null;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post<IUser[]>(`${this.apiUrl}/users/register`, { username, password});
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/users/login`,{ username, password}, { withCredentials: true }).pipe(
      tap((user: IUser): void => {
        this.currentUser = user;
      }), catchError(() => {
        this.currentUser = null ;
        return of (null);
      })
    );
  }

  logout(): Observable<any>{
    return this.http.post(`${this.apiUrl}/users/logout`, {}, {withCredentials: true }).pipe(
      tap(req => {
        this.currentUser = null;
      }),
      catchError((err) => {
      console.log(err);
      return err;
      })
    );
  }

  answering(userDataForUpdate): Observable<any> {
      const body = {};
      for (const key in userDataForUpdate) {
          if (userDataForUpdate[key]){
              body[key] = userDataForUpdate[key];
          }
      }
      return this.http.put<{}>(`${this.apiUrl}/users/profile`, {...body}, {withCredentials: true }).pipe(
        tap((user: IUser) => {
            this.currentUser = user;
        }),
        catchError((err) => {
            console.log(err);
            return err;
        })
    );
  }

  getProfileInfo(): Observable<any>{
     return this.http.get<IUser>(`${this.apiUrl}/users/profile`, {withCredentials: true}).pipe(
       tap(user =>  {
         this.currentUser = user;
         return this.currentUser;
        }),
       catchError(() => {
         this.currentUser = null;
         return of(null);
       })
     );
  }
}
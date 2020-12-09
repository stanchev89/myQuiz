import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IUser} from '../interfaces';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable()
export class UserService {
    private _currentUser: BehaviorSubject<IUser | null> = new BehaviorSubject(undefined);
    currentUser$: Observable<IUser | null> = this._currentUser.asObservable();
    isReady$ = this.currentUser$.pipe(map(user => user !== undefined));

    isLogged$ = this.currentUser$.pipe(
        map(user => !!user),
        catchError(err => {
            console.log(err);
            return of(null);
        })
        );
    isVip$ = this.currentUser$.pipe(
        map(user => user?.is_vip),
        catchError(err => {
            console.log(err);
            return of(null);
        })
    );

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post<IUser[]>(`/users/register`, { username, password});
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`/users/login`, { username, password}).pipe(
      tap((user: IUser): void => {
        this._currentUser.next(user);
      }), catchError(() => {
        this._currentUser.next(null);
        return of (null);
      })
    );
  }

  logout(): Observable<any>{
    return this.http.post(`/users/logout`, {}, ).pipe(
      tap(req => {
        this._currentUser.next(null);
      }),
      catchError((err) => {
      console.log(err);
      return err;
      })
    );
  }
    //TO DO after this nav-bar doesn't change!
  switchToVip(): Observable<any> {
      return this.answering({is_vip:true});
  }

  answering(userDataForUpdate): Observable<any> {
      const body = {};
      for (const key in userDataForUpdate) {
          if (userDataForUpdate[key]){
              body[key] = userDataForUpdate[key];
          }
      }
      return this.http.put<{}>(`/users/profile`, {...body}).pipe(
        tap((user: IUser) => {
            this._currentUser.next(user);
        }),
        catchError((err) => {
            console.log(err);
            return err;
        })
    );
  }

  getProfileInfo(): Observable<any>{
     return this.http.get<IUser>(`/users/profile`).pipe(
       tap(user =>  {
         this._currentUser.next(user);
         return user;
        }),
       catchError(() => {
         this._currentUser.next(null);
         return of(null);
       })
     );
  }

}
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../interfaces';
import { Observable, of} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {AppRootState} from "../+store";
import {login, logout,allUsers} from "./+store/actions";
@Injectable()
export class UserService {
    // private _currentUser: BehaviorSubject<IUser | null> = new BehaviorSubject(undefined);
    // currentUser$: Observable<IUser | null> = this._currentUser.asObservable();
    // isReady$ = this.currentUser$.pipe(map(user => user !== undefined));
    //
    // isLogged$ = this.currentUser$.pipe(
    //     map(user => !!user),
    //     catchError(err => {
    //         console.log(err);
    //         return of(null);
    //     })
    //     );
    // isVip$ = this.currentUser$.pipe(
    //     map(user => user?.is_vip),
    //     catchError(err => {
    //         console.log(err);
    //         return of(null);
    //     })
    // );
    currentUser$ = this.store.select((state: AppRootState) => state.auth.currentUser);
    isLogged$ = this.currentUser$.pipe(map(currentUser => currentUser !== null));
    isVip$ = this.currentUser$.pipe(map(currentUser => currentUser?.is_vip));
    isReady$ = this.currentUser$.pipe(map(currentUser => currentUser !== undefined));
    allUsersAreLoaded = false;

    constructor(private http: HttpClient, private store: Store<AppRootState>) {

  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<IUser[]>(`/users/register`, { username, password});
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`/users/login`, { username, password}).pipe(
      tap((user: IUser): void => {
        this.store.dispatch(login({currentUser: user}));
      }), catchError(() => {
        return of (null);
      })
    );
  }

  logout(): Observable<any>{
    return this.http.post(`/users/logout`, {}, ).pipe(
      tap(req => {
        this.store.dispatch(logout());
      }),
      catchError((err) => {
      console.log(err);
      return err;
      })
    );
  }

  updateProfileData(userDataForUpdate): Observable<any> {
      const body = {};
      for (const key in userDataForUpdate) {
          if (userDataForUpdate[key] !== undefined){
              if(userDataForUpdate[key].length > 0) {
                  if(body[key]) {
                      body[key].push(userDataForUpdate[key]);
                  }else {
                      body[key] = userDataForUpdate[key];
                  }
              }else {
                  body[key] = userDataForUpdate[key];
              }
          }
      }
      return this.http.put<{}>(`/users/profile`, {...body}).pipe(
        tap((user: IUser) => {
            this.store.dispatch(login({currentUser:user}));
            return;
        }),
          catchError((err: Observable<any>) => {
              return of(err)
          })
    );
  }

  changeUserPassword(oldPassword,newPassword): Observable<any> {
      return this.http.post<{}>('/users/change_password',{oldPassword,newPassword}).pipe(
          tap((user: IUser) => {
              this.store.dispatch(logout());
              return
      }));
  }

  getProfileInfo(): Observable<any>{
     return this.http.get<IUser>(`/users/profile`).pipe(
       tap(user =>  {
           this.store.dispatch(login({currentUser:user}));
         return user;
        }),
       catchError(() => {
         this.store.dispatch(logout());
         return of(null);
       })
     );
  }

  getAllUsers(): Observable<any> {
          return this.http.get<any>('/users/all-users').pipe(
              tap((users: IUser[]) => {
                  const objUserPoints = users.reduce((acc: { username: string, points: number }[], curr: IUser) => {
                      const {username, correct_answers} = curr;
                      const points = correct_answers.length;
                      const currentUser = {username: username, points: points};
                      acc.push(currentUser);
                      return acc;
                  }, []);
                  this.allUsersAreLoaded = true;
                  const sortedUsers = objUserPoints.sort((a, b) => b.points - a.points);
                  this.store.dispatch(allUsers({allUsers: sortedUsers}));
                  return sortedUsers;
              })
          )

  }

}
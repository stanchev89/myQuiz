import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map, switchMap, tap, first} from 'rxjs/operators';
import { IUser } from '../interfaces';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router)
    { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{

    return this.userService.currentUser$.pipe(
        switchMap(user => user === undefined ? this.userService.getProfileInfo() : [user]),
        map((user:IUser) => {
            const mustBeLoggedIn = route.data.mustBeLoggedIn;
            if (typeof route.data.mustBeVip === 'boolean'){
               return  user.is_vip === route.data.mustBeVip
            }
            return typeof mustBeLoggedIn !== 'boolean' || mustBeLoggedIn === !!user;
        }),
        tap((canContinue) => {
            if(canContinue) {return;}
            const url = this.router.url;
            this.router.navigateByUrl(url);
        }),
        first()
    )
  }

}
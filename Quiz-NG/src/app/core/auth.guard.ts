import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    let stream$: Observable<IUser> | null;
    if (this.userService.currentUser === undefined) {
      stream$ = this.userService.getProfileInfo();
    } else {
      stream$ = of(this.userService.currentUser);
    }
    return stream$.pipe(
      map((user) => {
        const mustBeLoggedIn = route.data.mustBeLoggedIn;
        return typeof mustBeLoggedIn !== 'boolean' || mustBeLoggedIn === !!user;
      }),
      tap((canContinue) => {
        if (canContinue){ return; }
        const url = this.router.url;
        this.router.navigateByUrl(url);
      })
    );
  }

}
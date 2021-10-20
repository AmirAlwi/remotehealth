import { GoogleSigninDirective } from './google-signin.directive';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private auth: GoogleSigninDirective, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.auth.user$.pipe(
        take(1),
        map(user => !!user), // <-- map to boolean
        tap(loggedIn => {
          if (!loggedIn) {
            console.log('access denied')
            this.router.navigate(['/login']);
          }
      })
 )
  }
  
}

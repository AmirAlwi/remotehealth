import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleSigninDirective } from './google-signin.directive';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  constructor(private auth : GoogleSigninDirective){}

  //| UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
      
    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.physician ? true: false),
      tap(isDoctor =>{
        if (!isDoctor) {
          console.error('Access denied - Organisation only')
        }
      })
    );
  }
  
}

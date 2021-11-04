import { Router } from '@angular/router';
import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { first, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './login-page/user';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  user$: Observable<User>;

  constructor(private gAuth : AngularFireAuth, private firestore : AngularFirestore, private router : Router) {

          this.user$ = this.gAuth.authState.pipe(
          switchMap(user => {
          if (user) {        
            const data = this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
            return data;
          } else {
            return of(null as any)
          }
        })
        );

   }

  @HostListener('click')
  onclick() {
    this.gAuth.signInWithPopup(new GoogleAuthProvider())
    .then((credential) =>{
      this.updateUserData(credential.user);
    });  
  }

  private updateUserData(user : any) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data : User = {
      uid : user.uid,
      email : user.email,
      roles: {
        patient: true
      },
      displayName : 'test'
    }
    userRef.get().subscribe(snap =>{
      if(!snap.exists){
        return userRef.set(data, { merge: true }) ;
      } else{
        return null;
      }
    });
  }

  getUser(){
    return this.user$.pipe(first()).toPromise();
  }

  isAdmin(user: User): boolean {
    const allowed = 'admin'
    return this.checkAuthorisation(user, allowed)
  }

  isPatient(user: User): boolean {
    const allowed = 'patient'
    return this.checkAuthorisation(user, allowed)
  }

  isDoctor(user: User): boolean {
    const allowed = 'physician'
    return this.checkAuthorisation(user, allowed)
  }

  private checkAuthorisation(user: User, allowadRole : string) : boolean {
    if (!user) return false;

    if (allowadRole = "patient"){
      if ( user.roles["patient"] ){
        return true;
      }
    } else if (allowadRole = "physician"){
        if ( user.roles["physician"] ){
          return true;
        }
    } else if (allowadRole = "admin"){
      if ( user.roles["admin"] ){
        return true;
      }
    }

    return false;

  }


}

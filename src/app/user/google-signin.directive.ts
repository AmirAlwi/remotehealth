import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import * as firebase from 'firebase/app'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './login-page/user';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private gAuth : AngularFireAuth, private firestore : AngularFirestore) { }

  @HostListener('click')
  onclick() {
    this.gAuth.signInWithPopup(new GoogleAuthProvider());
  }

  private updateUserData(user:any) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data : User = {
      uid : user.uid,
      email : user.email,
      roles: {
        patient: true
      }
    }
    return userRef.set(data, { merge: true })
  }


}

import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import * as firebase from 'firebase/app'

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private gAuth : AngularFireAuth) { }

  @HostListener('click')
  onclick() {
    this.gAuth.signInWithPopup(new GoogleAuthProvider());
  }

}

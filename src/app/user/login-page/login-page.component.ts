
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleSigninDirective } from './../google-signin.directive';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(public gAuth : AngularFireAuth, public auth : GoogleSigninDirective) { }

  ngOnInit(): void {
  }

  logout (){
    localStorage.removeItem('currentUid');
    this.gAuth.signOut();
  }
  signIn(){
    this.auth.onclick(); 
  }

}

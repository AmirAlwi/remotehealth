import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '.././login-page/user';
import { delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  form :FormGroup;
  type: 'login'| 'signup'| 'reset' = 'signup';
  loading = false;
  serverMessage: any;
  hide = true;

  constructor( private afauth: AngularFireAuth, private fb: FormBuilder,private router: Router, private firestore : AngularFirestore) {

   }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []]
    });
  }

  changeType(val: any){
    this.type = val;
  }

  get isLogin(){
    return this.type === 'login';
  }

  get isSignup(){
    return this.type === 'signup';
  }

  get isPasswordReset(){
    return this.type === 'reset';
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  get passwordConfirm(){
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch(){
    if (this.type !== 'signup'){
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  async onSubmit(){
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.afauth.signInWithEmailAndPassword(email, password);    
      }
      if (this.isSignup) {
        await this.afauth.createUserWithEmailAndPassword(email, password)
        .then((credential) =>{
          this.updateUserData(credential.user);
        }); 
        this.checkUserNRouting();     
      }
      if (this.isPasswordReset) {
        await this.afauth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }

  /**
   * check user data finished recorded, and rerouting page
   */
  async checkUserNRouting(){
     this.afauth.authState.subscribe( u =>{
      if(u){
        const data = this.firestore.doc<User>(`users/${u.uid}`).valueChanges();
        data.subscribe(ui => {
        this.router.navigate(['/login/profileSetup']);}
        );       
      }
    });
  }
  
  private updateUserData(user : any) {
    console.log('before update')
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data : User = {
      uid : user.uid,
      email : user.email,
      roles: {
        patient: true
      }
    }
     userRef.get().subscribe(snap =>{
      if(!snap.exists){
        return userRef.set(data, { merge: true }) ;
      } else{
        return null;
      }
    });
  }
}

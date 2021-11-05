import { GoogleSigninDirective } from './google-signin.directive';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { switchMap, map, first } from 'rxjs/operators';
import { User } from './login-page/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private gService : GoogleSigninDirective) { }

  getRole(){

    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .doc<User>(`users/${user.uid}`)
            .valueChanges();
        } else {
          return "false";
        }
      })
    );
  }

  async sendProfileData(data : User){
    const user = await this.gService.getUser();
   return await this.db.doc(`users/${user.uid}`).set(data, {merge: true});
  }

  getUid(){
    return this.afAuth.authState.subscribe( u =>{ 
      return u?.uid;
  }); 
  }

}

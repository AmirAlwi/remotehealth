import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, map, first } from 'rxjs/operators';
import { User } from './login-page/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }



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
}

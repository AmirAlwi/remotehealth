import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { switchMap, map } from 'rxjs/operators';
import { User } from './login-page/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

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

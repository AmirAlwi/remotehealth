import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { switchMap, map } from 'rxjs/operators';
import { activity,sensordata } from './activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitydbService {

  constructor(private auth : AngularFireAuth, private db : AngularFirestore) { }

  /**
   * get actitvity data from firebase
   */
  getAcitivtyLog(){
    return this.auth.authState.pipe(switchMap(user=>{
      if (user){
        return this.db.collection<activity>('activity',ref =>
      ref.where('uid', '==', user?.uid).orderBy('date')).valueChanges({idField : 'id'});
      } else {
        return [];
      }}));

  }
}

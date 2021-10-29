import { GoogleSigninDirective } from './../user/google-signin.directive';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import { chatCredential } from './chat.model';
import { arrayUnion } from 'firebase/firestore'




@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private auth : AngularFireAuth, private db : AngularFirestore, private gService : GoogleSigninDirective) { }

  /**
   * get chat session data from firebase
   */
  getChatRoomReq(){
    return this.auth.authState.pipe(switchMap(user=>{
      if (user){
        return this.db.collection<chatCredential>('chats',ref =>
      ref.where('connStatus', '==', false)).valueChanges({idField : 'id'}); //.orderBy('createdAt')
      } else {
        return [];
      }}));

  }

  async acceptPatient(id : string){
    const user = await this.gService.getUser();
    const data = {
      members: arrayUnion(user.uid),
      connStatus: true
    }
    
    return await this.db.doc(`chats/${id}`).update(data);
  }



}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import { chatCredential } from './chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private auth : AngularFireAuth, private db : AngularFirestore) { }

  /**
   * get chat session data from firebase
   */
  getChatRoomReq(){
    return this.auth.authState.pipe(switchMap(user=>{
      if (user){
        return this.db.collection<chatCredential>('chats',ref =>
      ref.where('members', 'array-contains', user?.uid)).valueChanges({idField : 'id'}); //.orderBy('createdAt')
      
      } else {
        return [];
      }}));

  }

}

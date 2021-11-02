import { Subscription, Observable } from 'rxjs';
import { ChatService } from './../chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { chatCredential } from '../chat.model';

@Component({
  selector: 'app-chat-board-list',
  templateUrl: './chat-board-list.component.html',
  styleUrls: ['./chat-board-list.component.scss']
})
export class ChatBoardListComponent implements OnInit {

  chatSession : chatCredential[]
  sub: Subscription;

  chat$: Observable<any>;
  newMsg: any;
  @Input() data: any  ;
  constructor(public cs: ChatService) { }

  ngOnInit(): void {
    this.sub = this.cs.getMySession().subscribe(
      session => (this.chatSession = session)
    );
  }

  chatWindows(input : any){
    this.data = input;
    const sessionId = this.data.id;
    this.chat$ = this.cs.joinUsers(this.cs.getMsg(sessionId));
  }

  submit(chatId : string){
    if(!this.newMsg){
      return alert('message is empty');
    } 
      this.cs.sendMessage(chatId, this.newMsg);
      this.newMsg = '';
    }
    
  trackByCreated(i : any , msg : any){
    return msg.createdAt;
  }

}

import { Subscription } from 'rxjs';
import { ChatService } from './../chat.service';
import { Component, OnInit } from '@angular/core';
import { chatCredential } from '../chat.model';

@Component({
  selector: 'app-chat-board-list',
  templateUrl: './chat-board-list.component.html',
  styleUrls: ['./chat-board-list.component.scss']
})
export class ChatBoardListComponent implements OnInit {

  chatSession : chatCredential[]
  sub: Subscription;

  constructor(public chat: ChatService) { }

  ngOnInit(): void {
    this.sub = this.chat.getMySession().subscribe(
      session => (this.chatSession = session)
    );
  }

}

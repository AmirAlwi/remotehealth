import { GoogleSigninDirective } from './../../user/google-signin.directive';
import { ChatService } from './../chat.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.scss']
})
export class ChatSessionComponent implements OnInit {

  constructor(public chat: ChatService, public user : GoogleSigninDirective) { }
  @Input() session: any;
  dispName : string;
  membersID : string[];
  endPersonId : any;
  ngOnInit(): void {
    this.user.user$.subscribe(u => {
      const userUid =  u.uid
      this.membersID = this.session.members
    for(let item of this.membersID){
      if (item != userUid ){
        this.chat.getDispName(item).subscribe( disp =>{
          this.endPersonId = disp?.displayName;
        })
      }
    }
    })
    
    
  }

}

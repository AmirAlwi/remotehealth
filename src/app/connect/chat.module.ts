import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoardListComponent } from './chat-board-list/chat-board-list.component';
import { ConnectToPatientsComponent } from './connect-to-patients/connect-to-patients.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ChatSessionComponent } from './chat-session/chat-session.component';
import { PostQuestionsComponent } from './post-questions/post-questions.component';


@NgModule({
  declarations: [
    ChatBoardListComponent,
    ConnectToPatientsComponent,
    ChatSessionComponent,
    PostQuestionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }

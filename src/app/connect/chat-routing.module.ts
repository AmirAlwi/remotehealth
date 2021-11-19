import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { PostQuestionsComponent } from './post-questions/post-questions.component';
import { ChatBoardListComponent } from './chat-board-list/chat-board-list.component';
import { ConnectToPatientsComponent } from './connect-to-patients/connect-to-patients.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
  {
    path :  'findPatient',
    component : ConnectToPatientsComponent
  },
  {
    path : 'messages',
    component: ChatBoardListComponent
  },
  {
    path: 'postquestions',
    component: PostQuestionsComponent
  },
  {
    path: 'mngpatient',
    component: ManagePatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }

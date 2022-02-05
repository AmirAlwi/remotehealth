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
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { PatCredentialComponent } from './pat-credential/pat-credential.component';
import { PatLogComponent } from './pat-log/pat-log.component';
import { PatientDataDialogComponent } from './dialog/patient-data-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    ChatBoardListComponent,
    ConnectToPatientsComponent,
    ChatSessionComponent,
    PostQuestionsComponent,
    ManagePatientComponent,
    PatCredentialComponent,
    PatLogComponent,
    PatientDataDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    ChatRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule
  ]
})
export class ChatModule { }

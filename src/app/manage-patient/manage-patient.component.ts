import { GoogleSigninDirective } from './../user/google-signin.directive';

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user/login-page/user';
@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }

}

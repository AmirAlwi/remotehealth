import { EmailLoginComponent } from './email-login/email-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    GoogleSigninDirective,
    EmailLoginComponent,
    ProfileSetupComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ]
})
export class UserModule { }

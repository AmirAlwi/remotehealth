import { SupportComponent } from './../support/support.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserGuard } from './user.guard';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path :  '',
    component : LoginPageComponent
  },
  {
    path : 'profileSetup',
    component : ProfileSetupComponent,
    canActivate : [UserGuard]
  },
  {
    path : 'profile',
    component : ProfilePageComponent,
    canActivate : [UserGuard]
  },
  {
    path : 'support',
    component: SupportComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { SupportComponent } from './support/support.component';
import { UserGuard } from './user/user.guard';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DoctorGuard } from './user/doctor.guard';

const routes: Routes = [
  {path: '',
  component: DashboardComponent,
  canActivate: [UserGuard]
  },
  {
    path : 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then(m => m.ActivityLogModule),
    canActivate: [ UserGuard]
  },
  {
    path: 'connect',
    loadChildren: () => import('./connect/chat.module').then(m => m.ChatModule),
    canActivate: [UserGuard]
  },
  {
    path : 'support',
    component: SupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { UserGuard } from './user/user.guard';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
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
    path: 'patients',
    component: ManagePatientComponent,
    canActivate: [DoctorGuard,UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DoctorGuard } from './user/doctor.guard';

const routes: Routes = [
  {path: '',
  component: DashboardComponent
  },
  {
    path : 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {path: 'activityLog',
   component: ActivityLogComponent
  },
  {
    path: 'patients',
    component: ManagePatientComponent,
    canActivate: [DoctorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

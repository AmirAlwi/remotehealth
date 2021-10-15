import { ActivityLogComponent } from './activity-log.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityLogRoutingModule } from './activity-log-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [    ActivityLogComponent],
  imports: [
    CommonModule,
    ActivityLogRoutingModule,
    SharedModule,
    FormsModule,
    MatCardModule

  ]
})
export class ActivityLogModule { }

import { ActivityLogComponent } from './activity-log/activity-log.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import { ActivityListPageComponent } from './activity-list-page/activity-list-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [    ActivityLogComponent, ActivityListPageComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule
  ]
})
export class ActivityLogModule { }

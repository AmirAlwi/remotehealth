import { Component, Input, OnInit } from '@angular/core';
import { ActivitydbService } from '../activitydb.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  
  @Input() board: any;
  constructor( public xtvtdb : ActivitydbService) { }

  ngOnInit(): void {
  }

  status : boolean;

  toggle(){
    this.status = !this.status;
  }

}

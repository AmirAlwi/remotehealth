
import { AfterViewInit, Component, HostListener, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivitydbService } from '../activitydb.service';
import { activity } from './../activity.model'
import { sensordata } from './../activity.model';

@Component({
  selector: 'app-activity-list-page',
  templateUrl: './activity-list-page.component.html',
  styleUrls: ['./activity-list-page.component.scss']
})

export class ActivityListPageComponent implements OnInit  {

  //real one
  activityBoard : activity[];
  sub: Subscription;

  constructor( public xtvtdb : ActivitydbService) {}
  
  innerHeight: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
  this.innerHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    
    this.sub = this.xtvtdb.getAcitivtyLog()
    .subscribe(log => (this.activityBoard = log));

    this.isDisplayed = false
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  isDisplayed : boolean = false;

  @Input() data: any  ;
  title:string;
  notes : string;
  activityDate : any;
  timeStart: any;
  timeEnd : any;
  timeInterval : number[];
  ids: Array<number>;
  sensData : sensordata;

  showLogDetails(value: any){
    try {
      this.isDisplayed= true
      this.data = value;
      this.title = this.data.title;
      this.activityDate = Date.parse(this.toDate(this.data.date.toString()));
      this.notes = this.data.notes;
      this.timeStart = Date.parse(this.toDateTime(this.data.time.starttime.toString()));
      this.timeEnd = Date.parse(this.toDateTime(this.data.time.endtime.toString()));
      this.timeInterval = this.getTimeInterval(this.data.time.starttime.toString());
      this.sensData = this.data.sensordata;

    } catch (error) {
      console.log(error);
    }
  }

  toDate(input: string){
    const year = input.slice(0,4);
    const month = input.slice(4,6);
    const day = input.slice(6,8);
    const date = month + " " + day + " " + year;
    
    return date
  }

  toDateTime(input : string){
    const year = input.slice(4,8);
    const month = input.slice(2,4);
    const day = input.slice(0,2);
    const hour = input.slice(9,11);
    const minute = input.slice(11,13);
    const longDate = month + " " + day + " " + year + " " + hour + ":"+ minute;

    return longDate;
  }

  getTimeInterval(input : string){
    const time = parseInt(input.slice(9,13));
    let refTime = time;

    const diff = ((this.timeEnd - this.timeStart)/(1000 * 3600)*60);
    const numb = new Array<number>(diff);

    let j = 0;

    for(let i = 0;i<=diff;i++){ 
      if(i % 60 !=0){
        j++
        numb[i]= refTime + j; 
      } else{
        numb[i]= time + ((i/60)*100);
        refTime = time + (i/60)*100;
        j = 0;
      }
    }
    return numb 
  }  

}




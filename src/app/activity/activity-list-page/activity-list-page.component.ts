
import { AfterViewInit, Component, HostListener, OnInit, Output, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivitydbService } from '../activitydb.service';
import { activity } from './../activity.model'

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

  @Input() data: any  ;
  title:string;
  isDisplayed : boolean = false;
  activityDate : any;
  notes : string;


  showLogDetails(value: any){
    try {
      this.isDisplayed= true
      this.data = value;
      this.title = this.data.title;
      this.activityDate = Date.parse(this.toDate(this.data.date.toString()));
      this.notes = this.data.notes;
    } catch (error) {
      
    }
  }

  toDate(input: string){
    const year = input.slice(0,4);
    const month = input.slice(4,6);
    const day = input.slice(6,8);
    const date = month + " " + day + " " + year;
    
    return date
  }

}




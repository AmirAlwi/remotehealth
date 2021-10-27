import { ActivityFunctionService } from './../activity-function.service';
import { AfterViewInit, Component, HostListener, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivitydbService } from '../activitydb.service';
import { activity } from './../activity.model'
import { sensordata } from './../activity.model';

import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-activity-list-page',
  templateUrl: './activity-list-page.component.html',
  styleUrls: ['./activity-list-page.component.scss']
})

export class ActivityListPageComponent implements OnInit  {

  //real one
  activityBoard : activity[];
  sub: Subscription;

  constructor( public xtvtdb : ActivitydbService, public service : ActivityFunctionService) {}
  
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

  timeInterval : string[];
  sensData : sensordata;
  temperature : number[];

  showLogDetails(value: any){
    try {
      this.isDisplayed= true
      this.data = value;

      this.title = this.data.title;
      this.notes = this.data.notes;

      this.activityDate = Date.parse(this.service.toDate(this.data.date.toString()));
      this.timeStart = Date.parse(this.service.toDateTime(this.data.time.starttime.toString()));
      this.timeEnd = Date.parse(this.service.toDateTime(this.data.time.endtime.toString()));
      this.timeInterval = this.service.getTimeInterval(this.data.time.starttime.toString(),this.timeStart,this.timeEnd);

      this.sensData = this.data.sensordata;
      this.innitData();

      this.testChart();
      
    } catch (error) {
      console.log(error);
    }
  }

  innitData(){
    let tempLength = this.sensData.temperature!.length;
    let heartLength = this.sensData.heartrate!.length;
    let oxyLength = this.sensData.oximeter!.length;

    const temp = JSON.parse(JSON.stringify(this.sensData.temperature));
    const heartR = JSON.parse(JSON.stringify(this.sensData.heartrate));
    const oxy = JSON.parse(JSON.stringify(this.sensData.oximeter));

    //this.temperature = new Array(tempLength)
    
    this.temperature = temp;
  }

  public myChart: Chart
  //TODO : sync data with db
  //problem to take direct from activity type value
  testChart(){
    if (this.myChart) this.myChart.destroy();
    const canvas = <HTMLCanvasElement> document.getElementById("myChart");
    canvas.width = 100;
    canvas.height = 25;

    const ctx = canvas.getContext('2d');
     this.myChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: this.timeInterval,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 255, 255)',
          data: this.temperature,
          
        }]
    },
    options: {
      responsive: true,
      //maintainAspectRatio: false,
        scales: {
            y: {
              ticks: {
                color: "white", 
                // font: {
                //   size: 18, // 'size' now within object 'font {}'
                // }  
              },
              min: 30 ,
              beginAtZero: false
            },
            x: {  
              ticks: {
                color: "white",  
                // font: {
                //   size: 14 // 'size' now within object 'font {}'
                // }
                autoSkip: true,
                maxTicksLimit: 21
              },
              beginAtZero: true,
              
              grid:{
                color:"white"
              }
          }
            
            
        },
        plugins: {  // 'legend' now within object 'plugins {}'
          legend: {
            labels: {
              color: "white",  // not 'fontColor:' anymore
              // fontSize: 18  // not 'fontSize:' anymore
              font: {
                size: 12 // 'size' now within object 'font {}'
              }
            }
          }
        },
    }

});
  }

}




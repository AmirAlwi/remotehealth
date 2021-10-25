
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
  timeInterval : string[];
  ids: Array<number>;
  sensData : sensordata;
  temperature : number[];

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
      this.innitData();
      this.testChart();
    } catch (error) {
      console.log(error);
    }
  }

  innitData(){
    let length = this.sensData.temperature!.length;
    
    const test = JSON.parse(JSON.stringify(this.sensData.temperature));
    this.temperature = new Array(length)
    this.temperature = test;
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
    let stringNumb : string[] = new Array(numb.length);
    let j = 0;

    for(let i = 0;i<=diff;i++){ 
      if(i % 60 !=0){
        j++
        numb[i]= refTime + j; 
        stringNumb[i] = numb[i].toString();

        stringNumb[i] = ('0000'+ stringNumb[i]).slice(-4)

      } else{
        numb[i]= time + ((i/60)*100);
        stringNumb[i] = numb[i].toString();

        stringNumb[i] = ('0000'+ stringNumb[i]).slice(-4)

        refTime = time + (i/60)*100;
        j = 0;
      }
    }
    return stringNumb 
  }  

  public myChart: Chart
  //TODO : sync data with db
  //problem to take direct from activity type value
  testChart(){
    if (this.myChart) this.myChart.destroy();
    const canvas = <HTMLCanvasElement> document.getElementById("myChart");
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
        
        scales: {
            y: {
              ticks: {
                color: "white", // not 'fontColor:' anymore
                // fontSize: 18,
                // font: {
                //   size: 18, // 'size' now within object 'font {}'
                // }  
              },
              beginAtZero: true
            },
            x: {  // not 'xAxes: [{' anymore (not an array anymore)
              ticks: {
                color: "white",  // not 'fontColor:' anymore
                //fontSize: 14,
                // font: {
                //   size: 14 // 'size' now within object 'font {}'
                // }
                stepSize:0.01
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
                size: 18 // 'size' now within object 'font {}'
              }
            }
          }
        },
    }

});
  }

}




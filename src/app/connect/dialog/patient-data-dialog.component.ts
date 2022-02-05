import { sensordata } from './../../activity/activity.model';
import { ActivityFunctionService } from './../../activity/activity-function.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import * as math from 'mathjs';
import { ConnectService } from '../connect.service';

Chart.register(...registerables);

Chart.register(annotationPlugin);

@Component({
  selector: 'app-patient-data-dialog',
  template: `
    <h1 mat-dialog-title>Patient Data Log</h1>
    <div mat-dialog-content>

      <h1>Activity Details 🥇</h1>
      <div class="log-content">
        <mat-grid-list cols="10" rowHeight="100px">
          <mat-grid-tile colspan="3" rowspan="1" class="right_border bot_border">
            <div class="align-left">
              <h1 class="contentTitle">{{title}}</h1>
              <div class="date">
                  {{activityDate | date:'longDate'}}
              </div>
            </div>
          </mat-grid-tile>

          <mat-grid-tile colspan="5" rowspan="2" class="right_border">
            <div class="desp">
              <span class="mid-header" style="display: incline-block;">Description :</span>
              <button mat-flat-button class="notebutton">Edit</button>
              <p class="notes">{{notes}}</p>
            </div>
          </mat-grid-tile>
          <mat-grid-tile colspan="2" rowspan="2" class="bot_border">
            <div class="dispTime">
              <h1 style="font-size: 25pt; border-bottom: 1px solid white;">Time</h1>
              <br>
              <h2 class="timeHeader">Start : </h2>
              <h2 class="timeHeader" style="margin-left: 20px;">{{timeStart | date:'shortTime'}}</h2>
              <br>
              <h2 class="timeHeader">Finish :</h2>
              <h2 class="timeHeader" style="margin-left: 10px;">{{timeEnd | date:'shortTime'}}</h2>
            </div>
          </mat-grid-tile>
          <mat-grid-tile colspan="3" rowspan="1" class="right_border">
            <div class="feel">
                <h2 class="mid-header">How did you feel?</h2>
            </div>
          </mat-grid-tile>
        </mat-grid-list>
        <br><br>
        <mat-tab-group class="tab" mat-align-tabs="start" [(selectedIndex)]="selectTab" (selectedTabChange)="dispTable($event)">
          <mat-tab label="All">
              <canvas id="all" height="20%" width="100%"></canvas>
          </mat-tab>
          <mat-tab label="Temperature 🤒">
            <canvas id="temperature" height="20%" width="100%"></canvas>
            <div style="margin-top: 30px;">
              <div>
                <span>Max : {{maxVal}}</span>
                <span style="margin-left: 40px;">Min : {{minVal}}</span>
              </div>
              <br>
              <div>
                <span>Median : {{medVal}}</span>
                <span style="margin-left: 40px;">Standard Deviation : {{stdVal}}</span>
              </div>


            </div>
          </mat-tab>
          <mat-tab label="Heart Rate 🫀">
            <canvas id="heartRate" height="20%" width="100%"></canvas>
            <div style="margin-top: 30px;">
              <div>
                <span>Max : {{maxVal}}</span>
                <span style="margin-left: 40px;">Min : {{minVal}}</span>
              </div>
              <br>
              <div>
                <span>Median : {{medVal}}</span>
                <span style="margin-left: 40px;">Standard Deviation : {{stdVal}}</span>
              </div>

            </div>
          </mat-tab>
          <mat-tab label="Oxygen Level 🤿">
            <canvas id="oxy" height="20%" width="100%"></canvas>
            <div style="margin-top: 30px;">
              <div>
                <span>Max : {{maxVal}}</span>
                <span style="margin-left: 40px;">Min : {{minVal}}</span>
              </div>
              <br>
              <div>
                <span>Median : {{medVal}}</span>
                <span style="margin-left: 40px;">Standard Deviation : {{stdVal}}</span>
              </div>

            </div>
          </mat-tab>
          <mat-tab label="Blood Pressure ♦️">
            <br><br>
            <h2>Blood Pressure </h2>
            <br>
            <h3>Systolic (upper no.) : {{bpUpper}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diastolic (lower no.) : {{bpLower}}</h3>
            <br>

            <button mat-flat-button class="note-button">Edit</button>
          </mat-tab>
        </mat-tab-group>

      </div>
    </div>
  `,
  styles: [`
  .log-content {
    border: 2px solid white;
    min-height: 90%;
    max-height: 90%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
  }

  .align-left {
    position: absolute;
    left: 5px;
}

.mat-dialog-content {
    max-height: 100%;
}

.contentTitle {
    font-size: 25pt;
    letter-spacing: 1pt;
    line-height: 0;
}

.date {
    line-height: 2em;
    font-size: 13pt;
    color: #16dfd5;
}

.desp {
    position: absolute;
    top: 5px;
    left: 13px;
}

.notes {
    margin-top: 5px;
    padding: 3px;
    min-width: 400px;
    max-width: 500px;
    min-height: 155px;
    background-color: #fa8142;
    border-radius: 10px;
}

.notebutton {
    height: 25px;
    line-height: 5px;
    background-color: #fa8142;
    color: rgb(27, 27, 27);
    margin-left: 200px;
}

.mat-flat-button {
    background-color: #fa8142;
    color: rgb(27, 27, 27);
}

.mid-header {
    font-style: bold;
    font-size: 16pt;
}

.feel {
    position: absolute;
    justify-content: center;
    top: 5px;
}

.dispTime {
    position: absolute;
    left: 15px;
    top: 5px;
}

.right_border {
    border-right: 1px solid white;
    ;
}

.bot_border {
    border-bottom: 1px solid white;
    ;
}

.timeHeader {
    display: inline-block;
}

.mat-tab-label.mat-tab-label-active {
    background-color: #fa8142;
}

  `]
})
export class PatientDataDialogComponent {

  isDisplayed: boolean = false;
  selectTab = 0;
  title: string;
  notes: string;

  activityDate: any;
  timeStart: any;
  timeEnd: any;

  timeInterval: string[];
  temperature: number[];
  heartrate: number[];
  oxygen: number[];
  bpLower: number = 0;
  bpUpper: number = 0;

  maxVal: number;
  minVal: number;
  stdVal: number;
  medVal: number;

  min_thresh: any;
  max_thresh: any;

  constructor(public dialogRef: MatDialogRef<PatientDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public connect: ConnectService, public service: ActivityFunctionService) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.notes = this.data.notes;
    this.activityDate = this.data.date;
    this.timeStart = this.data.starttime;
    this.timeEnd= this.data.endtime;
    this.timeInterval = this.service.getTimeInterval(this.timeEnd - this.timeStart);

    this.temperature = this.data.temperature;
    this.heartrate  = this.data.heartrate;
    this.oxygen  = this.data.oximeter;
    this.bpUpper = this.data.bpUpper;
    this.bpLower = this.data.bpLower;
    console.log(this.oxygen)
    if (this.chart)
      this.chart.destroy();
    this.chartAll();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public chart: Chart;
  public chartTemp: Chart;

  dispTable($event: any) {
    if (this.chart) this.chart.destroy();
    console.log("event index" + $event.index);

    if ($event.index == 1) {
      this.min_thresh = 37.5;
      this.max_thresh = 36;
      try {
        this.chartDisplay(this.temperature, "temperature");
      } catch (error) {
        console.log(error);
      }

      this.maxVal = this.connect.max(this.temperature);
      this.minVal = this.connect.min(this.temperature);
      this.stdVal = this.connect.std(this.temperature);
      this.medVal = this.connect.median(this.temperature);

    } else if ($event.index == 2) {
      this.min_thresh = 40;
      this.max_thresh = 255;
      try {
        this.chartDisplay(this.heartrate, "heartRate");
      } catch (error) {
        console.log(error);
      }

      this.maxVal = this.connect.max(this.heartrate);
      this.minVal = this.connect.min(this.heartrate);
      this.stdVal = this.connect.std(this.heartrate);
      this.medVal = this.connect.median(this.heartrate);

    } else if ($event.index == 3) {

      this.maxVal = this.connect.max(this.oxygen);
      this.minVal = this.connect.min(this.oxygen);
      this.stdVal = this.connect.std(this.oxygen);
      this.medVal = this.connect.median(this.oxygen);

      this.min_thresh = 90;
      this.max_thresh = 100;
      try {
        this.chartDisplay(this.oxygen, "oxy");
      } catch (error) {

      }
    } else if ($event.index == 0) {
      try {
        this.chartAll();
      } catch (error) {

      }
    }

  }

  chartDisplay(dataset: any[], id: string) {

    const canvas = <HTMLCanvasElement>document.getElementById(id);

    const hrLimit: any = {
      annotations: {
        line1: {
          type: 'line',
          yMin: this.min_thresh,
          yMax: this.min_thresh,
          borderColor: 'rgb(95, 242, 90)',
          borderWidth: 3,
          drawTime: "afterDatasetsDraw",
        },
        line2: {
          type: 'line',
          yMin: this.max_thresh,
          yMax: this.max_thresh,
          borderColor: 'rgb(95, 242, 90)',
          borderWidth: 3,
          drawTime: "afterDatasetsDraw"
        }
      }
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.timeInterval,
        datasets: [{
          backgroundColor: 'rgb(95, 242, 90)',
          borderColor: 'rgb(255, 255, 255)',
          data: dataset,
          tension: 0.3,

        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              color: "white",
            },
            suggestedMin: 90,
            suggestedMax: 40,
            beginAtZero: false
          },
          x: {
            display: true,
            ticks: {
              color: "white",
              autoSkip: true,
              maxTicksLimit: 21
            },
            beginAtZero: true,

            grid: {
              color: "white"
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          decimation: {
            enabled: true,
            algorithm: 'lttb', samples: 1000
          },
          annotation: hrLimit,

        },
        elements: {
          point: {
            // radius: this.adjustRadiusBasedOnData,
            // backgroundColor : this.adjustBackgroundColorHR,
            radius: 0,
          }
        },
      },
    });
  }

  chartAll() {
    const canvas = <HTMLCanvasElement>document.getElementById("all");

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.timeInterval,
        datasets: [{
          label: "Temperature",
          backgroundColor: 'rgb(95, 242, 90)',
          borderColor: 'rgb(95, 242, 90)',
          data: this.temperature,
          tension: 0.3,
        },
        {
          label: "Oxygen",
          backgroundColor: 'rgb(255,165,0)',
          borderColor: 'rgb(255,165,0)',
          data: this.oxygen,
          tension: 0.3,
        },
        {
          label: "Heartrate",
          backgroundColor: 'rgb(100,149,237)',
          borderColor: 'rgb(100,149,237)',
          data: this.heartrate,
          tension: 0.3,
        }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              color: "white",
            },
            suggestedMin: 90,
            suggestedMax: 40,
            beginAtZero: false
          },
          x: {
            display: true,
            ticks: {
              color: "white",
              autoSkip: true,
              maxTicksLimit: 21
            },
            beginAtZero: true,

            grid: {
              color: "white"
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
              font: {
                size: 12
              }
            }
          },
          decimation: {
            enabled: true,
            algorithm: 'lttb', samples: 1000
          },
        },
      },
    });

  }

}

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
      <button mat-flat-button (click)="test()">test</button>
    </div>
  `,
  styles: [
  ]
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
    this.timeStart = this.data.time.starttime;
    this.timeEnd = this.data.time.endtime;
    this.timeInterval = this.service.getTimeInterval(this.timeEnd - this.timeStart);

    const temp = JSON.parse(JSON.stringify(this.data.temperature));
    const hr = JSON.parse(JSON.stringify(this.data.heartrate));
    const oxy = JSON.parse(JSON.stringify(this.data.oximeter));
    const bpupper = JSON.parse(JSON.stringify(this.data.bloodpressure.upper));
    const bplower = JSON.parse(JSON.stringify(this.data.bloodpressure.lower));

    this.temperature = temp;
    this.oxygen = oxy;
    this.heartrate = hr;
    this.bpLower = bplower;
    this.bpUpper = bpupper

    if (this.chart) this.chart.destroy();
    this.chartAll();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  test() {
    const bplower = JSON.parse(JSON.stringify(this.data.bloodpressure.lower));
    console.log("inside data" + bplower);
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

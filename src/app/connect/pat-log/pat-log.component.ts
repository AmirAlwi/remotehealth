import { GeoPoint } from 'firebase/firestore';
import { Component, Input, OnChanges, SimpleChanges , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientDataDialogComponent } from '../dialog/patient-data-dialog.component';

@Component({
  selector: 'app-pat-log',
  templateUrl: './pat-log.component.html',
  styleUrls: ['./pat-log.component.scss']
})
export class PatLogComponent implements OnChanges {
  @Input() patLog : any
  displayedColumns: string[] = ['title', 'notes', 'date'];
  dataSource: MatTableDataSource<string>;

  // sub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
      this.dataSource = new MatTableDataSource(this.patLog);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDataDialog(title : string, notes :any, date:number, starttime: number, endtime : number, temperature : number[], oxygen: number[], heartrate : number[], bpUpper : number, bpLower : number, position?: GeoPoint, yaw?: number[],pitch?: number[], roll?: number[], accX?: number[], accY?: number[], accZ?: number[], magX?: number[], magY?: number[], magZ?: number[], gyroX?: number[], gyroY?: number[], gyroZ?: number[] ):void{
    console.log("dialog " + accX); //test
    this.dialog.open(PatientDataDialogComponent,{
      width:'80%',
      height:'90%',
      data:{title, notes,date, starttime, endtime, temperature, oxygen, heartrate, bpUpper, bpLower,position, yaw, pitch, roll, accX, accY, accZ, magX, magY, magZ, gyroX, gyroY, gyroZ}
    });
  }
  

}

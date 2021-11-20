import { activity } from './../../activity/activity.model';
import { GoogleSigninDirective } from './../../user/google-signin.directive';
import { ConnectService } from '../connect.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  patientList : string[];
  patCred : any;
  patLog : activity[];
  subCred: Subscription;
  subLog: Subscription;
  
  constructor(private cs: ConnectService, private gs: GoogleSigninDirective) { }
   

  ngOnInit(): void {
    this.cs.getPatientList().then((result) => {
      result.subscribe(val =>{
        this.dataSource = new MatTableDataSource(val.patients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }).catch((err) => {
      alert("load fail, please refresh page or check internet connection");
    });
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showData(uid : string){
    this.subCred = this.cs.getProfile(uid).subscribe( data =>{
      this.patCred = data;
    });
    this.subLog = this.cs.getActivityLog(uid).subscribe(
      log => (this.patLog = log)
    );
  }

}

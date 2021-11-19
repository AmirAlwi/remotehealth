import { GoogleSigninDirective } from './../../user/google-signin.directive';
import { ChatService } from './../chat.service';
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

  sub: Subscription;
  
  constructor(private cs: ChatService, private gs: GoogleSigninDirective) { }
   

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
    // this.sub = this.cs.getPatientList().subscribe((list) =>{
    //     this.dataSource = new MatTableDataSource(list.name);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // })
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

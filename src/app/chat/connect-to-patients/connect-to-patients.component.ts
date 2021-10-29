import { ChatService } from './../chat.service';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { chatCredential } from '../chat.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-connect-to-patients',
  templateUrl: './connect-to-patients.component.html',
  styleUrls: ['./connect-to-patients.component.scss']
})
export class ConnectToPatientsComponent {

  displayedColumns: string[] = ['owner', 'reqTitle', 'createdAt','connStatus'];
  dataSource: MatTableDataSource<chatCredential>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  chatSessionList : chatCredential[];
  test : any[];

  sub: Subscription;

  constructor( public chatReq : ChatService) {
    
  }

  ngOnInit(): void {
    this.sub = this.chatReq.getChatRoomReq().subscribe((list) => {
      this.chatSessionList = list;
      this.dataSource = new MatTableDataSource(this.chatSessionList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.chatSessionList)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @Input() docId : string;
  acceptPatient(){
    console.log()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}


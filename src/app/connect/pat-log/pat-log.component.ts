import { Component, Input, OnChanges, SimpleChanges , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { activity } from 'src/app/activity/activity.model';

@Component({
  selector: 'app-pat-log',
  templateUrl: './pat-log.component.html',
  styleUrls: ['./pat-log.component.scss']
})
export class PatLogComponent implements OnChanges {
  @Input() patLog : any
  displayedColumns: string[] = ['title', 'notes', 'date'];
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

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
  

}

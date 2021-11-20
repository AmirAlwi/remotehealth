import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-pat-credential',
  templateUrl: './pat-credential.component.html',
  styleUrls: ['./pat-credential.component.scss']
})
export class PatCredentialComponent implements OnInit {

  @Input() patCred : any;


  constructor() { }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MM',
//     dateA11yLabel: 'MM',
//     monthYearA11yLabel: 'MM YYYY',
//   },
// };

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss'],  
  // providers: [{
  //   provide: DateAdapter,
  //   useClass: MomentDateAdapter,
  //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  // },{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class ProfileSetupComponent implements OnInit {
  form :FormGroup;
  serverMessage: any;
  loading = false;
  constructor(private fb : FormBuilder) { }
  test : any;

  ngOnInit(): void {
    this.form = this.fb.group({
      gender : ['', [Validators.required]],
      lname : ['', [Validators.required]],
      fname : ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      height : ['' , [Validators.required]],
      weight: ['', [Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]]
    })
  }

  async onSubmit(){
    this.loading = true;

    const gender = this.gender?.value;
    const lname = this.lname?.value;
    const fname = this.fname?.value;
    const birthdate = Date.parse(this.birthdate?.value);
    this.test = birthdate;
    const height = this.height?.value;
    const weight = this.weight?.value;
    try {
      console.log( gender + ' ' + lname + ' ' + fname + ' ' + birthdate + ' ' + height + ' ' + weight);
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }

  get gender(){
    return this.form.get('gender');
  }

  get fname(){
    return this.form.get('fname');
  }

  get lname(){
    return this.form.get('lname');
  }

  get birthdate(){   
    return this.form.get('birthdate');
  }

  get height(){
    return this.form.get('height');
  }

  get weight(){
    return this.form.get('weight');
  }
}

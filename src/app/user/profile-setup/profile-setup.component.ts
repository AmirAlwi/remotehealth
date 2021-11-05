import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']  
})

export class ProfileSetupComponent implements OnInit {
  form :FormGroup;
  serverMessage: any;
  loading = false;
  constructor(private fb : FormBuilder) { }

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
    const birthdate = this.birthdate?.value;
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

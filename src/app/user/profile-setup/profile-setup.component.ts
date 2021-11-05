import { Router } from '@angular/router';
import { User } from './../login-page/user';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss'], 
})
export class ProfileSetupComponent implements OnInit {
  form :FormGroup;
  serverMessage: any;
  loading = false;
  constructor(private fb : FormBuilder, private servU : UserService, private router : Router) { }
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

    console.log("submitting");
    const data : User ={
      fName : this.fname?.value,
      lName : this.lname?.value,
      birthdate : Date.parse(this.birthdate?.value),
      gender : this.gender?.value,
      height : this.height?.value,
      weight : this.weight?.value
    }

    try {
        this.servU.sendProfileData(data);
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
    this.router.navigate(['/']);
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

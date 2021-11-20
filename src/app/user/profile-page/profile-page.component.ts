import {  Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../login-page/user';
import { UserService } from '../user.service';
import { GoogleSigninDirective } from '../google-signin.directive';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  edit : boolean =true;
  buttonName : string = "Update";
  profile: User;
  sub: Subscription;
  form :FormGroup;
  serverMessage: any;
  loading = false;


  constructor(private fb : FormBuilder, private servU : UserService, private router : Router, private gServe : GoogleSigninDirective) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      gender : ['', [Validators.required]],
      lname : ['', [Validators.required]],
      fname : ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      height : ['' , [Validators.required]],
      weight: ['', [Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]]
    });

    this.sub = this.servU.getProfile().subscribe( data => {
      this.profile = data;
      const birthD = new Date(this.profile.birthdate!)
      this.form.setValue({fname : this.profile.fName, gender : this.profile.gender, lname:this.profile.lName, birthdate : birthD, height: this.profile.height ,weight: this.profile.weight});
    })
    
  }

  async onSubmit(){
    this.loading = true;

    const data : User ={
      fName : this.fname?.value,
      lName : this.lname?.value,
      birthdate : Date.parse(this.birthdate?.value),
      gender : this.gender?.value,
      height : this.height?.value,
      weight : this.weight?.value
    }

    try {
      if(confirm("Are you sure to Update")) {
        this.servU.sendProfileData(data);
      }    
    } catch (err) {
      this.serverMessage = err;
    }

    this.formDisable();
    this.loading = false;
  }

  formDisable(){
    this.edit = !this.edit
    if(this.edit){
      this.buttonName = "Update"
    }else {
      this.buttonName = "Cancel"
    }
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

OnDestroy(){
  this.sub.unsubscribe();
}
}

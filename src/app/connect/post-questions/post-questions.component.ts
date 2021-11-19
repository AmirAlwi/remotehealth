import { postQ, Tag } from './../chat.model';
import { ChatService } from './../chat.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { arrayUnion } from 'firebase/firestore'

@Component({
  selector: 'app-post-questions',
  templateUrl: './post-questions.component.html',
  styleUrls: ['./post-questions.component.scss']
})
export class PostQuestionsComponent implements OnInit {
  selectedSpecialist : string;
  form : FormGroup;
  serverMessage : any;
  loading = false;

  constructor(private fb: FormBuilder, private service: ChatService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      subject : [ '', [Validators.required]],
      tag : [ '', [Validators.required]],
      msg : [ '', [Validators.required]]
    });
  }

  async onSubmit(){
    this.loading = true;
    console.log("submit")
    const data : postQ ={
      reqTitle : this.subject?.value,
      tag : this.tag?.value,
      members : [],
      msg : [],
      owner : "",
      createdAt : Date.now(),
      connStatus : false
    }

    const msg = this.msg?.value;

    try {
      if(confirm("Are you sure?")) {
        if (await this.service.sendQuestion(data , msg)) {
          this.subject?.reset(); 
          this.msg?.reset();
          this.tag?.reset();
          alert("Successful");
        }
        
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }

  get subject(){
    return this.form.get('subject');
  }

  get tag(){
    return this.form.get('tag');
  }

  get msg(){
    return this.form.get('msg');
  }

  specialist: Tag[] = [
    {value: 'General Practitioner', viewValue: 'General Practitioner'},
    {value: 'Dentistry', viewValue: 'Dentistry'},
    {value: 'Cardiology', viewValue: 'Cardiology'},
    {value: 'Psychiatry', viewValue: 'Psychiatry'},
    {value: 'Ear, Nose and Throat', viewValue: 'Ear, Nose and Throat'},
    {value: 'Family Medicine', viewValue: 'Family Medicine'},
    {value: 'Gynecology', viewValue: 'Gynecology'},
    {value: 'Hematology', viewValue: 'Hematology'},
    {value: 'Neurology', viewValue: 'Neurology'},
    {value: 'Orthopedic', viewValue: 'Orthopedic'},
    {value: 'Pediatrics', viewValue: 'Pediatrics'},
    {value: 'Cardiology', viewValue: 'Cardiology'},
    {value: 'Dermatology', viewValue: 'Dermatology'},
  ];

}

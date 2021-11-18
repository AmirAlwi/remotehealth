import { Component, OnInit } from '@angular/core';

interface Tag {
  value: string; 
  viewValue: string;
}

@Component({
  selector: 'app-post-questions',
  templateUrl: './post-questions.component.html',
  styleUrls: ['./post-questions.component.scss']
})
export class PostQuestionsComponent implements OnInit {
  selectedSpecialist : string;
  constructor() { }

  ngOnInit(): void {
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

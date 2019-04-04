import { Component, OnInit } from '@angular/core';

import { DataModelManagerService } from './data-model-manager.service';
import { Student } from './data-model-classes';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  //variables for the component
  students: Student[];

  constructor(private m: DataModelManagerService) { }

  ngOnInit() {
    //calls the students get all function in data model manager service, which will go to
    //the url in our web service that returns an Observable of a students array
    this.m.studentGetAll().subscribe(s => this.students = s);
  }
} 

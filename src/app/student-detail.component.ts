import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataModelManagerService } from './data-model-manager.service';
import { Student, Course } from './data-model-classes';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: []
})
export class StudentDetailComponent implements OnInit {
  //variables for the component
  student: Student;
  allCourses: Course[];
  BSDcourses: Course[];
  CPAcourses: Course[];

  constructor(private m: DataModelManagerService, private route: ActivatedRoute) {
    //initialize component variables
    this.student = new Student;
    this.student.credits = new Array;
    this.allCourses = new Array;
    this.BSDcourses = new Array;
    this.CPAcourses = new Array;
   }

  ngOnInit() {
    //gets the mongo id from the url
    let id = this.route.snapshot.params['id'];

    //calls the students get by Id function in data model manager service, which will go to
    //the url in our web service that returns an Observable of one student
    this.m.studentGetById(id).subscribe(s => this.student = s);

    //calls the courses get all, get BSD, and get CPA functions in data model manager service, which will go to
    //the url in our web service that returns an Observable of a courses array
    this.m.courseGetAll().subscribe(c => this.allCourses = c);
    this.m.courseGetBSD().subscribe(c => this.BSDcourses = c);
    this.m.courseGetCPA().subscribe(c => this.CPAcourses = c);
  }
    
  ngOnDestroy() {
    //on the destrcution of the component, these component variables will be
    //stored in the dataModelManagerService service class, to be accessed by other components
    this.m.student = this.student;
    this.m.allCourses = this.allCourses;
    this.m.BSDcourses = this.BSDcourses;
    this.m.CPAcourses = this.CPAcourses;
  }
}

import { Component, OnInit } from '@angular/core';

import { DataModelManagerService } from './data-model-manager.service';
import { Course } from './data-model-classes';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: []
})
export class CoursesComponent implements OnInit {
  //variables for the component
  courses: Course[];

  constructor(private m: DataModelManagerService) { }

  ngOnInit() {
    //calls the courses get all function in data model manager service, which will go to
    //the url in our web service that returns an Observable of a courses array
    this.m.courseGetAll().subscribe(c => this.courses = c);
  }

}

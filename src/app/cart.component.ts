import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { DataModelManagerService } from './data-model-manager.service';
import { Student, Course, CreateStudent, CreateStudentResponse, CreateCourse, CreateCourseResponse } from './data-model-classes';

@Component({
  selector: 'app-cart-select',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartSelectComponent implements OnInit {

  //variables for the component
  selected: Boolean;
  student: Student;
  tempStudent: CreateStudent;
  tempStudentResult: CreateStudentResponse;
  newCourse: CreateCourse;
  newCourseResult: CreateCourseResponse;
  allCourses: Course[];
  coursesPossible: Course[];
  BSDcourses: Course[];
  CPAcourses: Course[];
  coursesMatched: Course[];
  coursesSelected: Course[];
  coursesConfirmed: Course[];


  constructor(private m: DataModelManagerService, private r: Router) {

    //initialize the component variables
    this.student = new Student;
    this.tempStudent = new CreateStudent;
    this.tempStudentResult = new CreateStudentResponse;
    this.allCourses = new Array;
    this.coursesPossible = new Array;
    this.BSDcourses = new Array;
    this.CPAcourses = new Array;
    this.coursesMatched = new Array;
    this.coursesSelected = new Array;
    this.coursesConfirmed = new Array;

  }

  ngOnInit() {
    if (this.m.student == undefined) {
      this.r.navigate(['../students']);
    }

    this.student = this.m.student;
    this.allCourses = this.m.allCourses;
    this.coursesSelected = this.m.student.coursesSaved;
    this.coursesConfirmed = this.m.student.coursesConfirmed;

    if (this.student.academicProgram.match("BSD")) {
      this.coursesPossible = this.m.BSDcourses;
      this.courseMatch();
    }
    else {
      this.coursesPossible = this.m.CPAcourses;
      this.courseMatch();
    }
  }

  courseMatch(): void {
    for (var i = 0; i < this.coursesPossible.length; i++) {

      if (this.coursesPossible[i].enrolTotal < 4) {
        for (var j = 0; j < this.student.credits.length; j++) {

          if (!this.student.credits[j].courseCode.match(this.coursesPossible[i].courseCode)) {
            for (var f = 0; f < this.coursesPossible[i].prerequisite.length; f++) {

              if (this.coursesPossible[i].prerequisite[f] == this.student.credits[j].courseCode) {
                this.coursesPossible[i].classStart = this.coursesPossible[i].classStart.slice(0, this.coursesPossible[i].classStart.length - 3);
                this.coursesPossible[i].classEnd = this.coursesPossible[i].classEnd.slice(0, this.coursesPossible[i].classEnd.length - 3);
                this.coursesMatched.push(this.coursesPossible[i]);
              }

            }
          }

        }
      }
      
    }
  }

  isCourseSelected(course: Course): Boolean {
    this.selected = false;

    for (let i = 0; i < this.coursesSelected.length; i++) {
      if ((this.coursesSelected[i].courseId == course.courseId) && (this.coursesSelected[i].termSectionId == course.termSectionId) &&
        (this.coursesSelected[i].section.match(course.section))) {
        this.selected = true;
      }
    }
    return this.selected;
  }

  courseSelect(course: Course): void {
    if (this.isCourseSelected(course)) {
      for (var i = 0; i < this.coursesSelected.length; i++) {
        if ((this.coursesSelected[i].courseId == course.courseId) && (this.coursesSelected[i].termSectionId == course.termSectionId) &&
          (this.coursesSelected[i].section.match(course.section))) {
          this.coursesSelected.splice(i, 1);
        }
      }
    }
    else {
      this.coursesSelected.push(course);
    }
  }

  saveCart(): void {
    this.tempStudent = this.student;
    this.tempStudent.coursesSaved = this.coursesSelected;
    this.buttonDisplay("Cart Saved");
    this.m.cartSave(this.student.studentId, this.tempStudent).subscribe(u => this.tempStudentResult = u);
  }

  clearCart(): void {
    this.tempStudent = this.student;
    this.tempStudent.coursesSaved = new Array();
    this.coursesSelected = new Array();
    this.buttonDisplay("Cleared");
    this.m.cartSave(this.student.studentId, this.tempStudent).subscribe(u => this.tempStudentResult = u);

  }

  confirmCart(): void {
    this.tempStudent = this.student;

    if (this.student.coursesConfirmed.length > 0) {
      for (let i = 0; i < this.student.coursesConfirmed.length; i++) {

        for (let f = 0; f < this.allCourses.length; f++) {
          if ((this.allCourses[f].courseId == this.student.coursesConfirmed[i].courseId) &&
            (this.allCourses[f].termSectionId == this.student.coursesConfirmed[i].termSectionId) && (this.allCourses[f].section.match(this.student.coursesConfirmed[i].section) &&
              (this.allCourses[f].enrolTotal > 0))) {
            this.allCourses[f].enrolTotal = this.student.coursesConfirmed[i].enrolTotal - 1;
            this.updateCourse(this.allCourses[f]);
          }
        }
      }
    }

    for (let i = 0; i < this.coursesSelected.length; i++) {
      for (let j = 0; j < this.allCourses.length; j++) {

        if ((this.allCourses[j].courseId == this.coursesSelected[i].courseId) && (this.allCourses[j].termSectionId == this.coursesSelected[i].termSectionId) &&
          (this.allCourses[j].section.match(this.coursesSelected[i].section))) {
          this.allCourses[j].enrolTotal = this.coursesSelected[i].enrolTotal + 1;
          this.updateCourse(this.allCourses[j]);
        }

      }
    }

    for (let i = 0; i < this.coursesSelected.length; i++) {
      for (let f = 0; f < this.coursesConfirmed.length; f++) {

        if ((this.coursesConfirmed[f].courseId == this.coursesSelected[i].courseId) && (this.coursesConfirmed[f].termSectionId == this.coursesSelected[i].termSectionId)) {
          this.coursesSelected.splice(i, 1);
        }

      }
      this.tempStudent.coursesConfirmed.push(this.coursesSelected[i]);
    }

    this.tempStudent.coursesSaved = new Array;
    this.buttonDisplay("Confirmed");
    if (this.coursesSelected.length != 0) {
      this.m.confirmCart(this.tempStudent.studentId, this.tempStudent).subscribe(u => this.tempStudentResult = u);
    }

  }

  updateCourse(course: Course): void {
    this.newCourse = course;
    this.newCourse.enrolTotal = course.enrolTotal;
    this.m.courseSave(this.newCourse._id, this.newCourse).subscribe(u => this.newCourseResult = u);
  }

  buttonDisplay(message: string) {
    this.student.message = message;
  }
}
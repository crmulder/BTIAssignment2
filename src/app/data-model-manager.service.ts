import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Student, Course, CreateStudent, CreateStudentResponse, CreateCourse, CreateCourseResponse } from "./data-model-classes";

@Injectable({
  providedIn: 'root'
})
export class DataModelManagerService {

  constructor(private http: HttpClient) { }
  // URL to the example reqres.in web service
  //private url: string = "https://reqres.in/api/users";

  // Edit the base URL string to the web service
  private studentUrl: string = "https://dry-oasis-53810.herokuapp.com/api/students";
  private courseUrl: string = "https://dry-oasis-53810.herokuapp.com/api/courses";
  private courseBSDUrl: string = "https://dry-oasis-53810.herokuapp.com/api/courses/bsd2019winter";
  private courseCPAUrl: string = "https://dry-oasis-53810.herokuapp.com/api/courses/cpa2019winter";

  // Options object for POST and PUT requests
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Error handler, from the Angular docs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Data service operations

  student: Student;
  allCourses: Course[];
  BSDcourses: Course[];
  CPAcourses: Course[];
  coursesMatched: Course[];
  coursesSelected: Course[];

  // Get all students
  studentGetAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentUrl}`);
  }

  // Get all courses
  courseGetAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}`);
  }

  // Get courses, filtered
  courseGetBSD(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseBSDUrl}`);
  }

  // Get courses, filtered
  courseGetCPA(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseCPAUrl}`);
  }

  // Get one student
  studentGetById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.studentUrl}/${id}`);
  }

  // Edit existing student
  cartSave(id: string, newItem: CreateStudent): Observable<CreateStudentResponse> {
    return this.http.put<CreateStudentResponse>(`${this.studentUrl}/${id}/cart/save`, newItem, this.httpOptions)
      .pipe(
        tap((newItem: CreateStudentResponse) => console.log("Cart Saved")),
        catchError(this.handleError<CreateStudentResponse>('User edit'))
      );
  }

  // Edit existing course
  courseSave(id: string, newItem: CreateCourse): Observable<CreateCourseResponse> {
    return this.http.put<CreateCourseResponse>(`${this.courseUrl}/${id}/updated`, newItem, this.httpOptions)
      .pipe(
        tap((newItem: CreateCourseResponse) => console.log("Course Updated")),
        catchError(this.handleError<CreateCourseResponse>('User edit'))
      );
  }

  // Edit existing student
  confirmCart(id: string, newItem: CreateStudent): Observable<CreateStudentResponse> {
    return this.http.put<CreateStudentResponse>(`${this.studentUrl}/${id}/cart/confirmed`, newItem, this.httpOptions)
      .pipe(
        tap((newItem: CreateStudentResponse) => console.log("Cart Confirmed")),
        catchError(this.handleError<CreateStudentResponse>('User edit'))
      );
  }
}

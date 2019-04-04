 
export class Student {
  academicProgram: string;
  studentId: string;
  familyName: string;
  givenName: string;
  birthDate: Date;
  email: string;
  academicLevel: number;
  gpa: number;
  credits: Credits[];
  message: string;
  coursesSaved: Course[];
  coursesConfirmed: Course[];
}

class Credits {
  courseCode: string;
  courseName: string;
  termCompleted: string;
  gradeEarned: string;
}

// Course
export class Course {
  _id: string;
  courseId: number;
  term: string;
  academicProgram: string;
  level: number;
  prerequisite: [];
  courseCode: string;
  section: string;
  termSectionId: number;
  enrolCapacity: number;
  enrolTotal: number;
  room: string;
  roomCapacity: number;
  classStart: string;
  classEnd: string;
  classMon: string;
  classTue: string;
  classWed: string;
  classThu: string;
  classFri: string;
  dateStart: string;
  dateEnd: string;
  professor: string;
}

export class CreateStudent {
  studentId: string;
  coursesSaved: Course[];
  coursesConfirmed: Course[];
}

export class CreateStudentResponse {
  studentId?: string;
  coursesSaved: Course[];
  coursesConfirmed: Course[];
}

export class CreateCourse {
  _id: string;
  enrolTotal: number;
}

export class CreateCourseResponse {
  _id?: string;
  enrolTotal: number;
}
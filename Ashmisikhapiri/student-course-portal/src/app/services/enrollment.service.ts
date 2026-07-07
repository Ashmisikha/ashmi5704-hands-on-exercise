import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseService } from './course.service';

const API_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourseIds
      .map((id) => this.courseService.getCourseById(id))
      .filter((obs) => obs !== undefined) as unknown as Course[];
  }

  getEnrolledCoursesSync(courses: Course[]): Course[] {
    return courses.filter((c) => this.enrolledCourseIds.includes(c.id));
  }

  setEnrolledIds(ids: number[]): void {
    this.enrolledCourseIds = [...ids];
  }

  getStudentsByCourse(courseId: number): Observable<import('../models/student.model').Student[]> {
    return this.http.get<import('../models/student.model').Student[]>(
      `${API_URL}/students?courseId=${courseId}`
    );
  }
}

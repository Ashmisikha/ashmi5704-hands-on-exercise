import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Student } from '../../models/student.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { fadeIn } from '../../animations/route.animations';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  animations: [fadeIn]
})
export class CourseListComponent {
  courses$!: Observable<Course[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  enrolledIds$!: Observable<number[]>;
  selectedCourseId?: number;
  searchTerm = '';
  studentsForSelected$: Observable<Student[]> = of([]);
  currentEnrolledIds: number[] = [];

  constructor(private store: Store, private router: Router, private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
    this.enrolledIds$.subscribe((ids) => this.currentEnrolledIds = ids);
    this.store.dispatch(loadCourses());
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
    this.studentsForSelected$ = this.enrolledIds$.pipe(
      switchMap((ids) => ids.length ? this.courseService.getStudentsByCourse(ids[ids.length - 1]) : of([]))
    );
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm || null } });
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    if (this.currentEnrolledIds.includes(courseId)) {
      this.store.dispatch(unenrollFromCourse({ courseId }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId }));
    }
  }

  trackByCourseId(index: number, course: Course): number { return course.id; }
}

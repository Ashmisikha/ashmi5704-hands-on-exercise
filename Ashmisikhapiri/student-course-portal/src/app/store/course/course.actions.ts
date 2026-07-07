import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

export const createCourse = createAction(
  '[Course] Create Course',
  props<{ course: Omit<Course, 'id'> }>()
);
export const createCourseSuccess = createAction(
  '[Course] Create Course Success',
  props<{ course: Course }>()
);

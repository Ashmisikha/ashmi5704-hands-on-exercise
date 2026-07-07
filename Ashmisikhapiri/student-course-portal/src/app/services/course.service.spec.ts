import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const mockCourses = [
    { id: 1, name: 'A', code: 'A1', credits: 3, gradeStatus: 'passed' as const },
    { id: 2, name: 'B', code: 'B1', credits: 4, gradeStatus: 'pending' as const }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [CourseService] });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch courses', () => {
    service.getCourses().subscribe((courses) => expect(courses.length).toBe(2));
    httpMock.expectOne('http://localhost:3000/courses').flush(mockCourses);
  });

  it('should handle error', () => {
    service.getCourses().subscribe({ error: (error) => expect(error.message).toBe('Failed to load courses. Please try again.') });
    httpMock.expectOne('http://localhost:3000/courses').flush('Server error', { status: 500, statusText: 'Server Error' });
  });
});

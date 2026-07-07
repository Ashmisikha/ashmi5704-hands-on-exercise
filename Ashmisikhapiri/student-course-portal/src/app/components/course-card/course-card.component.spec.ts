import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  const mockCourse = { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' as const };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CourseCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render course name from input', () => {
    component.course = mockCourse; fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h3')).nativeElement.textContent).toContain('Data Structures');
  });
  it('should emit enrollRequested when enroll button clicked', () => {
    component.course = mockCourse; fixture.detectChanges(); spyOn(component.enrollRequested, 'emit');
    fixture.debugElement.queryAll(By.css('button'))[1].nativeElement.click(); fixture.detectChanges();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });
  it('should log on ngOnChanges', () => {
    spyOn(console, 'log'); component.course = mockCourse;
    component.ngOnChanges({ course: { previousValue: null, currentValue: mockCourse, firstChange: true, isFirstChange: () => true } });
    expect(console.log).toHaveBeenCalled();
  });
  it('should compute enrolled class', () => {
    component.course = mockCourse; component.enrolledIds = [1]; fixture.detectChanges();
    expect(component.cardClasses['card--enrolled']).toBeTrue();
  });
});

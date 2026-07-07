import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { CourseService } from '../../services/course.service';
import { fadeIn } from '../../animations/route.animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatChipsModule,
    MatProgressBarModule, MatListModule, CourseSummaryWidgetComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [fadeIn]
})
export class HomeComponent {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailable = 12;
  enrolled = 3;
  gpa = 3.8;
  studentName = 'Ashmi S.';
  notifications = [
    { icon: 'assignment', text: 'Assignment due: Data Structures — Jul 12', type: 'warning' },
    { icon: 'grade', text: 'Grade posted for Angular Fundamentals', type: 'success' },
    { icon: 'event', text: 'Mid-term exams begin next week', type: 'info' }
  ];
  deadlines = [
    { course: 'Database Systems', date: 'Jul 10', task: 'Project Submission' },
    { course: 'Operating Systems', date: 'Jul 15', task: 'Lab Report' }
  ];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => this.coursesAvailable = courses.length);
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}

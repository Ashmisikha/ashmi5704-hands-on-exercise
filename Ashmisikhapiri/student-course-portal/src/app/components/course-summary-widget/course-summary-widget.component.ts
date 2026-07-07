import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../services/course.service';
import { fadeIn } from '../../animations/route.animations';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css',
  animations: [fadeIn]
})
export class CourseSummaryWidgetComponent {
  private courseService = inject(CourseService);
  courseCount = 0;

  constructor() {
    this.courseService.getCourses().subscribe((courses) => this.courseCount = courses.length);
  }
}

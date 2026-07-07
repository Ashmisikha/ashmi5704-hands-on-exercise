import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { fadeIn } from '../../animations/route.animations';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
  animations: [fadeIn]
})
export class CourseDetailComponent {
  course?: Course;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe((course) => this.course = course);
  }

  get courseIcon(): string {
    const icons = ['code', 'storage', 'computer', 'hub', 'science'];
    return icons[(this.course?.id ?? 0) % icons.length];
  }

  get instructor(): string { return this.course?.instructor ?? 'Dr. Faculty'; }

  get progress(): number {
    return this.course?.gradeStatus === 'passed' ? 100 : this.course?.gradeStatus === 'pending' ? 60 : 25;
  }
}

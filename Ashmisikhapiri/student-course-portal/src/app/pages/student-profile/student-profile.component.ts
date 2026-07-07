import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { NotificationComponent } from '../../components/notification/notification.component';
import { fadeIn } from '../../animations/route.animations';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, NotificationComponent, MatCardModule, MatChipsModule, MatIconModule, MatTableModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
  animations: [fadeIn]
})
export class StudentProfileComponent {
  enrolledCourses$: Observable<Course[]>;
  displayedColumns = ['name', 'code', 'credits', 'status'];

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }
}

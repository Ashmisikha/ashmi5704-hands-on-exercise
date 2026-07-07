import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { cardHover } from '../../animations/route.animations';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CommonModule, CreditLabelPipe, HighlightDirective,
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule,
    MatProgressBarModule, MatExpansionModule
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
  animations: [cardHover]
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() enrolledIds: number[] = [];
  @Output() enrollRequested = new EventEmitter<number>();
  isExpanded = false;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course input changed:', changes['course']?.previousValue, changes['course']?.currentValue);
  }

  get cardClasses() {
    // A getter keeps complex class logic out of the template and makes the template easier to read.
    return {
      'card--enrolled': this.enrolledIds.includes(this.course?.id),
      'card--full': (this.course?.credits ?? 0) >= 4,
      expanded: this.isExpanded
    };
  }

  get borderColor(): string {
    return this.course?.gradeStatus === 'passed' ? '#16a34a' : this.course?.gradeStatus === 'failed' ? '#dc2626' : '#94a3b8';
  }

  get progress(): number {
    return this.course?.gradeStatus === 'passed' ? 100 : this.course?.gradeStatus === 'pending' ? 60 : 25;
  }

  get courseIcon(): string {
    const icons = ['code', 'storage', 'computer', 'hub', 'science', 'functions'];
    return icons[(this.course?.id ?? 0) % icons.length];
  }

  get instructor(): string {
    return this.course?.instructor ?? 'Dr. Faculty';
  }

  toggleDetails(): void { this.isExpanded = !this.isExpanded; }
  requestEnroll(event?: Event): void { event?.stopPropagation(); this.enrollRequested.emit(this.course.id); }
  openDetails(): void { this.router.navigate(['courses', this.course.id]); }
}

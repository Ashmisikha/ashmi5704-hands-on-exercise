import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { createCourse } from '../../store/course/course.actions';
import { fadeIn } from '../../animations/route.animations';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css',
  animations: [fadeIn]
})
export class EnrollmentFormComponent {
  model = { studentName: '', studentEmail: '', courseId: null as number | null, preferredSemester: 'Odd', agreeToTerms: false };
  submitted = false;
  constructor(private store: Store) {}
  onSubmit(form: NgForm): void {
    console.log(form.value, form.valid);
    this.submitted = !!form.valid;
    if (form.valid && this.model.courseId !== null) {
      this.store.dispatch(createCourse({ course: { name: this.model.studentName + ' Enrollment', code: String(this.model.courseId), credits: 3, gradeStatus: 'pending' } }));
    }
  }
}

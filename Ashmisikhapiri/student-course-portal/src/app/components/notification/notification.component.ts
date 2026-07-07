import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotificationService } from '../../services/notification.service';
import { fadeIn } from '../../animations/route.animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor, MatCardModule, MatIconModule, MatListModule],
  providers: [NotificationService],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  animations: [fadeIn]
})
export class NotificationComponent {
  // Component-level providers create a separate NotificationService instance scoped to this component tree.
  messages: string[];

  constructor(private notificationService: NotificationService) {
    this.notificationService.add('Scoped notification service instance active.');
    this.messages = this.notificationService.getMessages();
  }
}

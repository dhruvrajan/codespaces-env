// src/app/components/user-search/user-search.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../test-service/test-service.service';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [CommonModule, FormsModule], // Required for ngFor and ngModel
  template: `
    <div>
      <h2>User Search (httpResource)</h2>
      <input [(ngModel)]="searchTerm" (ngModelChange)="searchTerm.set($event)" placeholder="Search users..." />
      @if (usersResource.isLoading()) {
        <p>Loading...</p>
      } @else if (usersResource.error()) {
        <p>Error: {{ usersResource.error() }}</p>
      } @else {
        <ul>
          @for (user of usersResource.value(); track user.id) {
            <li>{{ user.name }} - {{ user.email }}</li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    div { padding: 20px; }
    input { margin-bottom: 10px; padding: 5px; width: 200px; }
    ul { list-style-type: none; padding: 0; }
    li { margin: 5px 0; }
  `,
})
export class UserSearchComponent {
  userService = inject(UserService);

  // Reactive Signal for the search term
  searchTerm = signal('');

  // HttpResourceRef from the service
  usersResource = this.userService.getUsersResource(this.searchTerm);
}
// src/app/components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../test-service/test-service.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Required for ngFor and ngModel
  template: `
    <div>
      <h2>User List</h2>
      <input [(ngModel)]="searchTerm" (input)="fetchUsers()" placeholder="Search users..." />
      <ul>
        @for (user of users; track user.id) {
          <li>{{ user.name }} - {{ user.email }}</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    div { padding: 20px; }
    input { margin-bottom: 10px; padding: 5px; width: 200px; }
    ul { list-style-type: none; padding: 0; }
    li { margin: 5px 0; }
  `],
})
export class TestComponentComponent implements OnInit {
  users: User[] = [];
  searchTerm = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers(this.searchTerm).subscribe({
      next: (data: any) => (this.users = data),
      error: (err: any) => console.error('Error fetching users:', err),
    });
  }
}
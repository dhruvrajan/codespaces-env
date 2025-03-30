// src/app/services/user.service.ts
import { Injectable, Resource, signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root', // Makes the service available app-wide
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/fake_search';

  constructor(private http: HttpClient) { }

  getUsers(searchTerm: string = ''): Observable<User[]> {
    const url = searchTerm ? `${this.apiUrl}?q=${encodeURIComponent(searchTerm)}` : this.apiUrl;
    return this.http.get<User[]>(url);
  }

  /* Experimenting using http resource */
  getUsersResource(searchTerm: Signal<string>): HttpResourceRef<User[] | undefined> {
    return httpResource<User[]>(() =>
      searchTerm()
        ? `${this.apiUrl}?q=${encodeURIComponent(searchTerm())}`
        : this.apiUrl
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_STORAGE_KEY = 'userId';
  private readonly USERNAME_STORAGE_KEY = 'userName';

  private baseUrl = 'http://localhost:3000/api';

  constructor(private router: Router, private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_STORAGE_KEY);
  }

  getUserName(userName: string) {
    return localStorage.getItem(this.USERNAME_STORAGE_KEY);
  }

  login(userId: string, userName: string): void {
    localStorage.setItem(this.USER_STORAGE_KEY, userId);
    localStorage.setItem(this.USERNAME_STORAGE_KEY, userName);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-dashboard/header`, {
      headers: { Authorization: localStorage.getItem('token') || '' },
    });
  }

  logout(): void {

    localStorage.removeItem(this.USER_STORAGE_KEY);
    localStorage.removeItem(this.USERNAME_STORAGE_KEY);

    this.router.navigate(['/signin']);
  }
}

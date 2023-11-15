import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_STORAGE_KEY = 'userId';
  private readonly USERNAME_STORAGE_KEY = 'userName';

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_STORAGE_KEY);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.USERNAME_STORAGE_KEY);
  }

  login(userId: string, userName: string): void {
    localStorage.setItem(this.USER_STORAGE_KEY, userId);
    localStorage.setItem(this.USERNAME_STORAGE_KEY, userName);
  }

  logout(): void {

    localStorage.removeItem(this.USER_STORAGE_KEY);
    localStorage.removeItem(this.USERNAME_STORAGE_KEY);

    this.router.navigate(['/signin']);
  }
}

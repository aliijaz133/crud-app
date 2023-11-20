import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://localhost:3000/api/user-dashboard/user-list";

  constructor(private http: HttpClient) { }

  updateUser(userId: string, userData: { userName?: string, userEmail?: string }): Observable<any> {
    const url = `${this.url}/${userId}`;
    return this.http.patch<any>(url, userData);
  }


  deleteUser(userId: string): Observable<any> {
    const url = `${this.url}/${userId}`;
    return this.http.delete<any>(url);
  }

}

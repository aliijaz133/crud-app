import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userData: any;

  showLoader = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.showLoader = true;

    this.getUserData();

    setTimeout(() => {
      this.showLoader = false;
    });

   

  }



  getUserData(): void {
    const userId = 'yourUserId';

    console.log('User ID:', userId);

    this.http.get(`http://localhost:3000/api/userdata/${userId}`).subscribe(
      (response: any) => {
        this.userData = response;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}

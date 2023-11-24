import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ConnectionService } from 'ng-connection-service';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;

  user = {
    userEmail: '',
    userPwd: '',
  };

  userLogin: FormGroup;
  showLoader = false;
  hide = true;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private connectionService: ConnectionService,
    private authService: AuthService
  ) {
    this.userLogin = this.fb.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPwd: new FormControl('', [Validators.required]),
    });

    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = (<unknown>isConnected) as boolean;
      if (this.isConnected) {
        this.status = 'ONLINE';
        // this.toastr.success('You are online now.');
      } else {
        this.status = 'OFFLINE';
        this.toastr.error('Internet connection Error.');
      }
    });
  }

  ngOnInit(): void {
    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }

  onSubmit() {
    this.user.userEmail = this.userLogin.value.userEmail;
    this.user.userPwd = this.userLogin.value.userPwd;

    // console.log('User login:', this.user);

    this.http.post('http://localhost:3000/api/signin', this.user).subscribe(
      (response: any) => {
        console.log('Server response:', response);

        localStorage.setItem('userId', response._id);

        this.toastr.success('Successfully Logged in.');

        this.router.navigate(['/user-dashboard/home'], {
          queryParams: { userEmail: this.user.userEmail },
        });
      },
      (error) => {
        console.error('Server error:', error);

        if (error.status === 401) {
          this.toastr.error('Invalid email or password');
        } else {
          this.toastr.error('Login failed. Please try again.');
        }
      }
    );
  }

  signUpPage() {
    this.router.navigate(['/signup']);
  }
}

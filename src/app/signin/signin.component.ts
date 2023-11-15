import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
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
    private router: Router
  ) {
    this.userLogin = this.fb.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPwd: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }

  onSubmit() {
    // Update the user object with form values
    this.user.userEmail = this.userLogin.value.userEmail;
    this.user.userPwd = this.userLogin.value.userPwd;
  
    // console.log('User login:', this.user);
  
    this.http.post('http://localhost:3000/api/signin', this.user)
      .subscribe(
        (response: any) => {
          console.log('Server response:', response);
  
          localStorage.setItem('userId', response._id);
  
          this.toastr.success('Successfully Logged in.');
  
          this.router.navigate(['/dashboard']);
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

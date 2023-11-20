import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


interface User {
  userName: string;
  userEmail: string;
  userPwd: string;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user = {
    userName: '',
    userEmail: '',
    userPwd: '',
  };

  hide = true;
  timeNow?: number;
  showLoader = false;
  userSignUp: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userSignUp = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPwd: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 2000);

  }

  signUp() {
    if (this.userSignUp.valid) {
      const userData: User = this.userSignUp.value;
      // console.log('User submitted:', userData);

      this.http.post('http://localhost:3000/api/signup', userData)
        .subscribe(
          (response) => {
            // console.log('Server response:', response);
            this.toastr.success("Successfully Registered.")
            this.router.navigate(['/signin']);
          },
          (error) => {
            console.error('Server error:', error);
            this.toastr.warning('Email address is already exist.')
          }
        );
    }

    this.userSignUp.reset();
  }

  loginPage() {
    this.router.navigate(['/signin']);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';

interface User {
  userName: string;
  userMobile: string;
  userEmail: string;
  userPwd: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;

  user = {
    userName: '',
    userMobile: '',
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
    private router: Router,
    private connectionService:ConnectionService
  ) {
    this.userSignUp = this.fb.group({
      userName: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.minLength(12)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPwd: ['', Validators.required],
    });

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = <unknown>isConnected as boolean;
      if(this.isConnected){
      this.status = "ONLINE";
      this.toastr.success('You are online now.');
      } else {
      this.status = "OFFLINE"
      this.toastr.error('Internet connection')
      }
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

      this.http.post('http://localhost:3000/api/signup', userData).subscribe(
        (response) => {
          // console.log('Server response:', response);
          this.toastr.success('Successfully Registered.');
          this.router.navigate(['/signin']);
        },
        (error) => {
          console.error('Server error:', error);
          this.toastr.warning('Email address is already exist.');
        }
      );
    }

    this.userSignUp.reset();
  }

  formatPhoneNumber(event: any) {
    const input = event.target.value.replace(/\D/g, '');
    const match = input.match(/^(\d{0,4})(\d{0,7})/);

    if (match) {
      const formatted = match[1] + (match[1] && match[2] ? ' ' : '') + match[2];
      event.target.value = formatted;
    }
  }

  loginPage() {
    this.router.navigate(['/signin']);
  }
}

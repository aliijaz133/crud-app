import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  userImg: any;
  data: any[] = [];
  userIdentity: any;
  notifications_list: any[];
  today = new Date();
  pipe = new DatePipe('en-US');
  alert_count: any;
  showLoader = false;

  asset = {
    logo: '../../../assets/image/crud-logo.png',
    avatar: '../../../assets/image/avatar.png',
  };

  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.notifications_list = [];
    this.alert_count = '';
  }

  ngOnInit(): void {
    this.showLoader = true;

    this.getUserName();

    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }

  logout(): void {
    this.authService.logout();
  }

  getUserName() {
    return (this.userName = this.authService.getLoggedInUserName());
  }
}

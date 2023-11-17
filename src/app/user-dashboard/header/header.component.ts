import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe],
})
export class HeaderComponent {
  userName: any;
  userImg: any;
  data: any[] = [];
  hidden: boolean = false;
  userIdentity: any;
  notifications_list: any[]
  today = new Date();
  pipe = new DatePipe('en-US');
  alert_count: any;
  showLoader = false;

  constructor(public route: ActivatedRoute, private authService: AuthService,
    private router: Router,
  ) {
    this.notifications_list = []
    this.alert_count = ""
  }
  ngOnInit(): void {

    this.userName = this.authService.getUserName(this.userName);

    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 2000)
  }


  toggleBadgeVisibility() {
    this.hidden = true;
  }


  logout(): void {
    this.authService.logout();
  }

  userProfile() {

  }

  getNotification() {

  }


  onMenuClosed() {
    console.log('Menu closed');
  }

  markRead(id: any) {

  }
}
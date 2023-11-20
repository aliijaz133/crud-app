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
  userName: string | undefined;
  userImg: any;
  data: any[] = [];
  hidden: boolean = false;
  userIdentity: any;
  notifications_list: any[];
  today = new Date();
  pipe = new DatePipe('en-US');
  alert_count: any;
  showLoader = false;

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

    setTimeout(() => {
      this.showLoader = false;
    }, 2000);

    this.authService.getUser().subscribe(
      (data: any) => {
        this.userName = data.userName;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  toggleBadgeVisibility() {
    this.hidden = true;
  }

  logout(): void {
    this.authService.logout();
  }

  userProfile() {
    // Navigate to user profile page if needed
    // this.router.navigate(['/user-profile']);
  }

  getNotification() {
    // Implement notification logic if needed
  }

  onMenuClosed() {
    console.log('Menu closed');
  }

  markRead(id: any) {
    // Implement mark as read logic if needed
  }
}

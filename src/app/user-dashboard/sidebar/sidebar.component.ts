import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  showLoader = false;

  home = '/user-dashboard/home';

  metamask = '/user-dashboard/meta-mask';

  userlist = '/user-dashboard/user-list';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }

  logout() {
    this.authService.logout();
  }
}

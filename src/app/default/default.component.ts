import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  signin = ['/sigin'];

  signup = ['/signup'];

  showLoader = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  }

  signUp() {
    this.router.navigate(this.signup);
  }

  login() {
    this.router.navigate(this.signin);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router
  ) {}

  ngOnInit() {}
  //login
  onLogin() {
    this.splashScreenService.login();
    this.router.navigateByUrl('/places/tabs/discover');
  }
}

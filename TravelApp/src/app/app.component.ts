import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreenService } from './splash-screen/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router
  ) {}
  onLogout() {
    this.splashScreenService.logout();
    this.router.navigateByUrl('/splash-screen');
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreenService } from './splash-screen/splash-screen.service';
import { Plugins, Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        // Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout() {
    this.splashScreenService.logout();
    this.router.navigateByUrl('/splash-screen');
  }
}

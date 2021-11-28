import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  isLoading = false;
  isLogin = true;
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}
  //login
  onLogin() {
    this.isLoading = true;
    this.splashScreenService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((loadingEl) => {
        loadingEl.present();
        //add time out
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 2000);
      });
  }
  onSubmit(form: NgForm) {
    // console.log(form);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if (this.isLogin) {
      // Send request to login
    } else {
      // Send request to signup
    }
  }

  onSwitchAuthModel() {
    this.isLogin = !this.isLogin;
  }
}

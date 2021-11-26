import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private _userIsAuthenticated = false;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() {}
  //Add login
  login() {
    this._userIsAuthenticated = true;
  }
  // Add logout
  logout() {
    this._userIsAuthenticated = false;
  }
}

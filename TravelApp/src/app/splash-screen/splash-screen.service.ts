import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private _userIsAuthenticated = true;
  // Add userId
  private _userId = 'abc';

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }
  // Add getter
  get userId() {
    return this._userId;
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

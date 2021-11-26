import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SplashScreenService } from './splash-screen.service';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenGuard implements CanLoad {
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.splashScreenService.userIsAuthenticated) {
      this.router.navigateByUrl('/splash-screen');
    }
    return this.splashScreenService.userIsAuthenticated;
  }
}

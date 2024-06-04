import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthExpiredReason } from '../enums';
import { AppStorageService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private appStorage: AppStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.appStorage.token) {
      return true;
    }

    // Check if there is an authentication token
    if (this.appStorage.token) {
      return true;
    } else {
      // Redirect to the login page with redirection back to the original request
      const urlTree = this.router.createUrlTree(['/login'], {
        queryParams: {
          redirectUrl: state.url, // Pass the current URL as the redirectUrl parameter to the login page
          reason: AuthExpiredReason.tokenExpired,
        },
      });
      return urlTree;
    }
  }
}

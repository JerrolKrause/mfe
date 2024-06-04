import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private storage: AppStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Log the User in
   * @param username
   * @param password
   * @returns
   */
  public login(username: string, password: string) {
    this.storage.token = '12345';
    return new Subject();
  }

  /**
   * Log the User out
   */
  public logOut() {
    this.storage.token = null;
    // Create the redirect URL with the current URL and query parameters
    const loginUrl = this.createLoginUrl();
    // Redirect to the login page
    this.router.navigateByUrl(loginUrl);
  }

  /**
   * Creates the login URL with a redirect URL parameter.
   * @returns The constructed login URL.
   */
  private createLoginUrl(): string {
    // Get the current URL and query parameters
    const currentUrl = this.router.url;
    const queryParams = this.route.snapshot.queryParams;
    // Encode the current URL
    const redirectUrl = encodeURIComponent(currentUrl);

    // Create a URL tree for the login page with the redirect URL and existing query parameters
    return this.router
      .createUrlTree(['/login'], {
        queryParams: { redirectUrl, ...queryParams },
      })
      .toString();
  }
}

import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
interface MainMenuItem {
  label: string;
  icon?: any;
  routerLink?: string;
  routerLinkActiveOptions?: any;
  command?: () => any;
}

@Component({
  selector: 'lib-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit, OnDestroy {
  public navMenu: MainMenuItem[] = [
    {
      label: 'Dashboard',
      routerLink: '/',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Sandbox',
      routerLink: '/sandbox',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Quoting',
      routerLink: '/quoting',
      routerLinkActiveOptions: { exact: false },
    },
  ];

  public utilityMenu: MainMenuItem[] = [
    {
      label: 'Sign Out',
      command: () => this.logOut(),
    },
  ];

  public sidebarVisible = signal(false);

  constructor(private router: Router) {
    // On route change, if mobile nav is open close it
    this.router.events
      .pipe(
        // takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => this.sidebarVisible.set(false));
  }

  ngOnInit(): void {}

  /**
   * Toggle sidebar
   */
  public toggleSidebar() {
    this.sidebarVisible.update((v) => !v);
  }

  /**
   * Update application
   */
  public updateApp() {}

  /**
   * Log out
   */
  public logOut() {}

  ngOnDestroy(): void {
    // Test
  }
}

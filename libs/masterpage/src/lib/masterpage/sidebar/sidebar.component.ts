import { applicationRoutes } from '$shared';
import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  startWith,
  take,
} from 'rxjs';
@Component({
  selector: 'lib-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  public loanId$ = this.route.params.pipe(
    debounceTime(100),
    map((params) => params['loanId'] as string | null)
  );

  public routeCurrent$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    debounceTime(1),
    startWith(null),
    map(() => {
      // Get the URL after the domain
      const url = this.router.url;
      // Split the URL into segments
      const segments = url.split('/');
      // Return the last segment
      return segments[segments.length - 1];
    })
  );

  public applications$ = new BehaviorSubject([
    {
      loanID: '533854',
      borrowerNameFirst: 'Colleen',
      borrowerNameLast: 'Denning',
    },
    {
      loanID: '533734',
      borrowerNameFirst: 'Smith',
      borrowerNameLast: 'John',
    },
  ]);

  public openTabs = signal<number[]>([]);

  navItems = applicationRoutes;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    combineLatest([
      this.applications$,
      this.route.params.pipe(
        map((params) => params['loanId'] as string | null)
      ),
    ])
      .pipe(
        map(([apps, loanId]) => {
          if (loanId === null) {
            return [];
          }
          const index = apps.findIndex((app) => app.loanID === loanId);
          return index !== -1 ? [index] : [];
        }),
        take(1)
      )
      .subscribe((index) => this.openTabs.set(index));
  }
}

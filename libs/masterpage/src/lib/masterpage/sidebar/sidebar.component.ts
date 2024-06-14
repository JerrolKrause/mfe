import { applicationRoutes } from '$shared';
import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  mergeMap,
  startWith,
  take,
} from 'rxjs';

interface App {
  loanID: string;
  borrowerNameFirst: string;
  borrowerNameLast: string;
  fullName: string;
  phoneNumber: string;
  isActive: boolean;
}

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

  /** All available apps, used for searching */
  public applications$ = new BehaviorSubject([
    {
      loanID: '533854',
      borrowerNameFirst: 'Colleen',
      borrowerNameLast: 'Denning',
      fullName: 'Denning, C',
      phoneNumber: '4351236657',
      isActive: true,
    },
    {
      loanID: '533734',
      borrowerNameFirst: 'John',
      borrowerNameLast: 'Smith',
      fullName: 'Smith, J',
      phoneNumber: '9491238874',
      isActive: false,
    },
  ] as App[]);

  /** Active Apps */
  public applicationsActive$ = this.applications$.pipe(
    map((apps) => apps.filter((app) => app.isActive))
  );

  public openTab = signal<number | null>(null);

  navItems = applicationRoutes;

  public searchForm = this.fb.group({
    searchTerm: '',
  });

  public searchResults$ = this.searchForm.controls[
    'searchTerm'
  ].valueChanges.pipe(
    // Ensure minumum 2 char search term
    map((searchTerm) =>
      searchTerm && searchTerm.length >= 2 ? searchTerm : null
    ),
    // Use search term to extract apps that match
    mergeMap((searchTerm) =>
      this.applications$.pipe(
        // Filter out any apps that already active
        map((apps) => apps.filter((app) => !app.isActive)),
        map((apps) =>
          // Filter apps based on search term
          apps.filter(
            (app) =>
              // Filter out any apps that are already active
              // Convert entire object to JSON to allow searching for non-visible text
              // Normalize app and search term
              !app.isActive &&
              this.normalizeSearchText(JSON.stringify(app)).includes(
                this.normalizeSearchText(searchTerm)
              )
          )
        )
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
            return null;
          }
          const index = apps.findIndex((app) => app.loanID === loanId);
          return index;
        }),
        take(1)
      )
      .subscribe((index) => this.openTab.set(index));
  }

  /**
   * Add an app to the active index
   * @param loanID
   */
  public add(loanID: string | null) {
    const app = this.applications$.value.find((app) => app.loanID === loanID);
    if (app) {
      app.isActive = true;
      this.applications$.next([...this.applications$.value]);
    }
    this.searchForm.reset();
  }

  /**
   * Remove an app from the active index
   * @param loanID
   */
  public remove(loanID: string | null) {
    const app = this.applications$.value.find((app) => app.loanID === loanID);
    if (app) {
      app.isActive = false;
      this.applications$.next([...this.applications$.value]);
    }
  }

  /**
   * Normalize a string to make it easier for searching
   * @param str
   * @returns
   */
  private normalizeSearchText(str: string | null) {
    return String(str)
      .replace(/[^A-Z0-9]/gi, '')
      .toLowerCase();
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, filter, map, mergeMap, take } from 'rxjs';

interface Geo {
  lat?: string;
  lng?: string;
}

interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: Geo;
}

interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

interface User {
  id?: number | null;
  name?: string | null;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

interface CustomerData {
  CUST_FIRST_NAME_X: string;
  CUST_MIDDLE_INIT_X: string;
  CUST_LAST_NAME_X: string;
  OTHER_NAMES_USED_X: string;
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss',
})
export class SandboxComponent implements OnInit {
  public form = this.fb.group({
    CUST_FIRST_NAME_X: new FormControl(),
    CUST_MIDDLE_INIT_X: new FormControl(),
    CUST_LAST_NAME_X: new FormControl(),
    OTHER_NAMES_USED_X: new FormControl(),
  });

  public loading$ = new BehaviorSubject(false);
  public userId$ = this.route.params.pipe(map((params) => params['id']));

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loading$.next(true);
    // Look at the route param and use that to load the correct user ID
    this.userId$
      .pipe(
        mergeMap((id) =>
          this.http.get<CustomerData>(
            `http://localhost:3000/api/applications/branch/389/application/${id}`
          )
        ),
        filter((x) => !!x),
        take(1)
      )
      .subscribe(
        (user) => {
          this.loading$.next(false);
          this.form.patchValue(user);
        },
        () => {
          this.loading$.next(false);
          this.messageService.add({
            life: 3000,
            severity: 'error',
            summary: 'Error loading user data',
            detail: 'Check the console for details',
          });
        }
      );
  }

  /**
   * Submit updated user
   */
  public submit() {
    this.loading$.next(true);
    const val = this.form.getRawValue() as Partial<User>;
    this.userId$
      .pipe(
        mergeMap((id) =>
          this.http.put(
            `http://localhost:3000/api/applications/branch/389/application/${id}`,
            val
          )
        )
      )
      .subscribe(
        () => {
          this.loading$.next(false);
          this.messageService.add({
            life: 3000,
            severity: 'success',
            summary: 'Success',
            detail: 'User Updated Successfully',
          });
        },
        () => {
          this.loading$.next(false);
          this.messageService.add({
            life: 3000,
            severity: 'error',
            summary: 'Error saving user data',
            detail: 'Check the console for details',
          });
        }
      );
  }
}

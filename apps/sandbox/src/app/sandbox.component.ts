import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, filter, map, mergeMap, take } from 'rxjs';

export interface CustomerData {
  CUST_FIRST_NAME_X: string;
  CUST_MIDDLE_INIT_X: string;
  CUST_LAST_NAME_X: string;
  OTHER_NAMES_USED_X: string;
}

interface State {
  finished: boolean;
  loading: boolean;
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss',
})
export class SandboxComponent implements OnInit {
  // Customer form
  public form = this.fb.group({
    CUST_FIRST_NAME_X: new FormControl(),
    CUST_MIDDLE_INIT_X: new FormControl(),
    CUST_LAST_NAME_X: new FormControl(),
    OTHER_NAMES_USED_X: new FormControl(),
  });

  public state$ = new BehaviorSubject<State>({
    finished: false,
    loading: false,
  });

  /** Extract userId and branchID from the route params and ensure type safety */
  public routeParams$ = this.route.params.pipe(
    map((params) => ({
      userId: params['userId'] as string,
      branchId: params['branchId'] as string,
    }))
  );

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  public openClassLink() {
    const src_pid = sessionStorage.getItem('src_pid');
    const src_sid = sessionStorage.getItem('src_sid');
    const branchId = this.route.snapshot.params['branchId'];
    const userId = this.route.snapshot.params['userId'];
    const url = `CLASSAppLookupIB:${src_pid}:${src_sid}:${branchId}:${userId}`;
    // const url = `CLASSAppLookupIB:${branchId}:${userId}`;
    // alert(url);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.click();
    link.remove();
    setTimeout(function () {
      window.self.close();
    }, 500);
  }

  public closeBrowserTab() {
    window.self.close();
  }

  public stateChange(state: Partial<State>) {
    this.state$
      .pipe(take(1))
      .subscribe((stateOld) => this.state$.next({ ...stateOld, ...state }));
  }

  ngOnInit(): void {
    this.stateChange({ loading: true });

    // Look at the route param and use that to load the correct user ID
    this.routeParams$
      .pipe(
        mergeMap(({ branchId, userId }) =>
          this.http.get<CustomerData>(
            `http://localhost:3000/api/applications/branch/${branchId}/application/${userId}`
          )
        ),
        filter((x) => !!x),
        take(1)
      )
      .subscribe(
        (user) => {
          this.stateChange({ loading: false });
          this.form.patchValue(user);
        },
        () => {
          this.stateChange({ loading: false });
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
    this.stateChange({ loading: true });

    const val = this.form.getRawValue() as Partial<CustomerData>;
    this.routeParams$
      .pipe(
        mergeMap(({ branchId, userId }) =>
          this.http.put(
            `http://localhost:3000/api/applications/branch/${branchId}/application/${userId}`,
            val
          )
        )
      )
      .subscribe(
        () => {
          // Show 'User Updated' window
          this.stateChange({ loading: false, finished: true });
          // Attempt to close window programmatically
          try {
            window.close();
          } catch (err) {
            console.error(err);
          }
          /** Moved to standalone card
          this.messageService.add({
            life: 3000,
            severity: 'success',
            summary: 'Success',
            detail: 'User Updated Successfully',
          });
           */
        },
        () => {
          this.stateChange({ loading: false });
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

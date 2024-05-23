import { FormsLib } from '$forms';
import { AuthExpiredReason, AuthenticationService } from '$shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public formOptions: FormsLib.FormOptions = {};

  private errorSubject$ = new BehaviorSubject<string | null>(null);
  public errorMessage$ = combineLatest([
    this.route.queryParams.pipe(
      map((params) => (params['reason'] ? (params['reason'] as string) : null)),
      map((reason) => {
        switch (reason) {
          case AuthExpiredReason.tokenExpired:
            return 'Your session has expired. Please log in again.';
          case AuthExpiredReason.inactivity:
            return 'You have been logged out due to inactivity.';
          case AuthExpiredReason.manual:
            return 'You have logged out successfully.';
          default:
            return null;
        }
      })
    ),
    this.errorSubject$,
  ]).pipe(map(([routeError, loginError]) => loginError || routeError));

  public formModel: FormsLib.FormGenerator = [
    {
      label: 'User Name',
      type: 'formField',
      formFieldType: 'text',
      field: 'username',
      validators: {
        required: true,
      },
    },
    {
      label: 'Password',
      type: 'formField',
      formFieldType: 'password',
      field: 'password',
      validators: {
        required: true,
      },
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      () => {
        const redirectUrl =
          this.route.snapshot.queryParams['redirectUrl'] || '/';
        this.router.navigateByUrl(decodeURIComponent(redirectUrl));
      },
      () => {
        this.errorSubject$.next('Invalid username or password.');
      }
    );
  }
}

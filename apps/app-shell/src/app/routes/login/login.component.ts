import { AuthExpiredReason } from '$shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage$ = this.route.queryParams.pipe(
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
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }
  }
}

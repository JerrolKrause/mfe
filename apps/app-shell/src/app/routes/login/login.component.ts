import { FormsLib } from '$forms';
import { AuthExpiredReason } from '$shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    username: [null],
    password: [null],
  });

  public formOptions: FormsLib.FormOptions = {};

  public errorMessage$ = this.route.queryParams.pipe(
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
      formFieldType: 'text',
      field: 'password',
      validators: {
        required: true,
      },
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.loginForm);
  }

  login() {
    this.loginForm.updateValueAndValidity();
    this.loginForm.patchValue(this.loginForm.value);
    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      return;
    }
  }
}

import { Component } from '@angular/core';
import { LoginService } from '../../../../../users/src/app/shared/stores/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private svc: LoginService) {}
}

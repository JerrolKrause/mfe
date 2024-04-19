import { FormsLib } from '$forms';
import { SocketService } from '$state-management';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { QuotingService } from '../../shared/services/quoting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public loginFrm = this.fb.group({
    nameLast: 'Smith',
    ssnLast4: '1234',
    applicationNumbner: '',
  });

  public formOptions: FormsLib.FormOptions = {
    submitButton: {
      label: 'Continue',
    },
  };

  public formModel: FormsLib.FormGenerator = [
    {
      label: 'Last Name',
      type: 'formField',
      formFieldType: 'text',
      field: 'nameLast',
    },
    {
      label: 'Last 4 SSN',
      type: 'formField',
      formFieldType: 'text',
      field: 'ssnLast4',
      maxLength: 4,
    },
    {
      type: 'html',
      html: '<div class="text-center"><strong>OR</strong></div>',
    },
    {
      label: 'Application Number',
      type: 'formField',
      formFieldType: 'text',
      field: 'applicationNumbner',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socket: SocketService,
    private quotingSvc: QuotingService
  ) {}

  public onFormCompleted() {
    this.socket.registerUser(this.loginFrm.value.ssnLast4 ?? '1234');
    this.quotingSvc.submitForm(this.loginFrm.value);
    this.router.navigate(['./quote']);
  }
}

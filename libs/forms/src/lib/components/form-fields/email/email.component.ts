import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { BaseFormFieldComponent } from '../form-field.base';

@Component({
  selector: 'lib-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent
  extends BaseFormFieldComponent<string>
  implements OnInit
{
  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit(): void {}
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { FormsLib } from '../../../forms.model';
import { BaseFormFieldComponent } from '../form-field.base';

@Component({
  selector: 'lib-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RadioComponent
  extends BaseFormFieldComponent<any[]>
  implements OnInit
{
  /** Specifies the options to be displayed in the radio */
  @Input() options?: FormsLib.FieldOptions[] | null = null;
  /** Specifies the unique identifier for the options, used for the track function */
  @Input() dataKey?: string | null = null;
  /** Specifies the property of the option to use as the label to be displayed */
  @Input() optionLabel = 'label';
  /** Specifies the property of the option to use as the value that will be bound to the form control */
  @Input() optionValue = 'value';

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit(): void {
    console.log();
  }
}

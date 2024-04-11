import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { FormsLib } from '../../../forms.model';
import { BaseFormFieldComponent } from '../form-field.base';

@Component({
  selector: 'lib-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectButtonComponent
  extends BaseFormFieldComponent<string>
  implements OnInit
{
  /** Specifies the options to be displayed in the button */
  @Input() options?: FormsLib.FieldOptions[] | null = null;
  /** Specifies whether multiple options can be selected */
  @Input() multiple?: boolean | null = null;
  /** pecifies the unique identifier for the options, used for the track function */
  @Input() dataKey?: string | null = null;
  /** Specifies whether the dropdown should take up the full width of its container */
  @Input() fullWidth = true;
  /** Specifies whether an option can be unselected once it has been selected */
  @Input() canUnselect?: boolean | null = null;

  // Store the previous value of the user selection, used to unselect
  private lastValue: string | null = '';

  constructor() {
    super();
  }

  ngOnInit(): void {}

  /**
   * When a user clicks on an option
   * @param e
   */
  public onOptionClick(e: SelectButtonOptionClickEvent) {
    // If canUnselect is set and the current value equals the previous value, reset to null to unselect
    if (
      this.canUnselect &&
      !this.multiple &&
      this.formControl?.value === this.lastValue
    ) {
      this.formControl?.patchValue(null);
      this.formControl.markAsTouched(); // Necessary to set validation state and show errors if required
      this.lastValue = null;
    } else {
      this.lastValue = e.option.value;
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { BaseFormFieldComponent } from '../form-field.base';

@Component({
  selector: 'lib-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberComponent),
      multi: true,
    },
  ],
})
export class NumberComponent
  extends BaseFormFieldComponent<string>
  implements OnInit, ControlValueAccessor
{
  /** Show or hide spinner buttons */
  @Input() showButtons?: boolean | null = false;
  /** Min number to allow, NOT min characters */
  @Input() min?: number | null = null;
  /** Max number to allow, NOT max characters */
  @Input() max?: number | null = null;
  /** The MAXIMUM number of characters allowed by this input, NOT max number */
  @Input() maxLength?: number | null = null;
  /** Decimal will allow decimal points, currency will prepend a currency symbol */
  @Input() mode?: 'decimal' | 'currency' | null = 'decimal';
  /** Use a comma to separate thousands/millions/etc */
  @Input() useGrouping?: boolean | null = true;
  /** The minimum number of fraction digits to use */
  @Input() minFractionDigits?: number | null = 0;
  /** The maximum number of fraction digits to use */
  @Input() maxFractionDigits?: number | null = 2;
  /** Use a comma to separate thousands/millions/etc */
  @Input() currencySymbol?: string | null = null;

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit(): void {
    // If mode is currency, allow cents and add currency symbol
    if (this.mode === 'currency') {
      this.minFractionDigits = this.minFractionDigits ?? 2;
      // this.currencySymbol = this.currencySymbol ?? '$';
    }
  }

  /**
   * When the users enters something in the input
   * @param e
   */
  onInput(e: InputNumberInputEvent) {
    let value = e.value;
    // If max length was specified, enforce it. Without this the patch on this control will bypass it
    if (this.maxLength) {
      value = parseInt(String(value).slice(0, this.maxLength));
    }
    // Patch the value into the form control on every input change/keypress
    // This fixes an issue with the p-number component because it only updates the form control on blur
    this.formControl?.patchValue(value);
  }
}

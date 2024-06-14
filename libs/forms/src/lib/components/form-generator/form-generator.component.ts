import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsLib } from '../../forms.model';
import { is } from '../../utils';

/**
 * This is a component that generates a form based on a provided model, with options for dynamic data fields and validation, and emits the completed form data when the user submits it.
 *
 * @example
 * <lib-form-generator
  [formModel]="myFormModel"
  [formGroup]="myFormGroup"
  [options]="myFormOptions"
  [datafields]="myDatafields"
  [disableSubmit]="false"
  (completed)="onFormCompleted($event)"
></lib-form-generator>

// Example Formmodel
public formModel: FormsLib.FormGenerator = [
    {
      label: 'First Name',
      type: 'formField',
      formFieldType: 'text',
      field: 'nameFirst',
    },
    {
      label: 'Last Name',
      type: 'formField',
      formFieldType: 'text',
      field: 'nameLast',
    },
  ];

  // Form Options
    public formOptions: FormsLib.FormOptions = {
    submitButton: {
      hide: true
    },
  };
 *
 * @TODO
 * - Add support for feature components
 * - Possible issue with required fields and dynamic visibility. IE required field is shown then hidden
 * - SSR support
 */
@Component({
  selector: 'lib-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormGeneratorComponent {
  /** Model to generate the form */
  @Input() formModel?: FormsLib.FormGenerator | null = [];
  /** Main form group */
  @Input() formGroup: FormGroup | null = null;
  /** Form Options */
  @Input() options?: FormsLib.FormOptions | null = null;
  /** Datafields for dynamic data */
  @Input() datafields?: FormsLib.Datafields | null = {};
  /** Disable submit button. Otherwise will rely on the form validators to allow submission */
  @Input() disableSubmit: null | boolean = false;
  /** Enable/disable the form */
  @Input() set disabled(disabled: boolean | null) {
    if (is.node) return; // SSR check
    // Current setTimeout is the only method that works to disable the form onload
    setTimeout(() => {
      disabled ? this.formGroup?.disable() : this.formGroup?.enable();
      this.formGroup?.markAsUntouched(); // Reset validation state on disable changes
    }, 1);
  }
  /** When the user submits the form */
  @Output() completed = new EventEmitter<unknown>();

  constructor() {}

  /**
   * On form submit, run validation
   * @returns
   */
  public submit() {
    if (is.node || !this.formGroup) {
      return;
    }
    this.formGroup.patchValue(this.formGroup.value);
    this.formGroup.markAllAsTouched();

    if (this.formGroup?.invalid) {
      // Wait for DOM to update with new validation states
      Promise.resolve().then(() => {
        // Get all errors on page
        const errors = document.getElementsByClassName(
          'lib-form-field-has-errors'
        );
        if (errors?.length) {
          // Get top of first error bounding box, scroll to the top of that box
          const y =
            errors[0].getBoundingClientRect().top +
            window.pageYOffset +
            (this.options?.errorScrollOffset ?? 0);
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
      /**
      setTimeout(() => {
        // Get all errors on page
        const errors = document.getElementsByClassName(
          'lib-form-field-has-errors'
        );
        if (errors?.length) {
          // Get top of first error bounding box, scroll to the top of that box
          const y =
            errors[0].getBoundingClientRect().top +
            window.pageYOffset +
            (this.options?.errorScrollOffset ?? 0);
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100); */
      return;
    }
    this.completed.emit(this.formGroup.getRawValue());
  }
}

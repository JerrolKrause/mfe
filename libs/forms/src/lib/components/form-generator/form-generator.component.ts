import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import { FormsLib } from '../../forms.model';
import { is } from '../../utils';

// Export the button event emitter so that we don't have to pass the event up a large component chain
export const buttonEvent = new EventEmitter<any>();

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
>
    <!-- Use a custom feature template -->
    <ng-template featureId="myId">
      <div class="custom-content">
        <h3>Template 1 Content</h3>
        <p>This is the first template content to be displayed.</p>
      </div>
    </ng-template>
  </lib-form-generator>

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
 */
@Component({
  selector: 'lib-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormGeneratorComponent implements OnInit {
  /** Model to generate the form */
  @Input() formModel?: FormsLib.FormGenerator | null = [];
  /** Main form group */
  @Input() formGroup: FormGroup | null = null;
  /** Form Options */
  @Input() options?: FormsLib.FormOptions | null = null;
  /** Datafields for dynamic data */
  @Input() datafields?: FormsLib.Datafields | null = {};
  /** Disable submit button. Otherwise will rely on the form validators to allow submission */
  @Input() disableSubmit?: null | boolean = false;
  /** Enable/disable the form */
  @Input() set disabled(disabled: boolean | null) {
    if (is.node) return; // SSR check
    // Current setTimeout is the only method that works to disable the form onload
    setTimeout(() => {
      disabled ? this.formGroup?.disable() : this.formGroup?.enable();
      this.formGroup?.markAsUntouched(); // Reset validation state on disable changes
    }, 1);
  }

  /** Keep track of whether the form has been submitted or not at least once */
  private hasSubmitted$ = new BehaviorSubject(false);
  /** Display form level errors */
  public formErrors$ = this.hasSubmitted$.pipe(
    filter((x) => !!x), // Only allow stream on one submit
    // Switch to form value changes
    // Note that form group is nillable so if its not present on submit this will cause issues
    switchMap(() => this.formGroup?.valueChanges ?? of()),
    debounceTime(50),
    // Extract any form level errors and turn them into a string array for display on the UI
    map(() =>
      !this.formGroup?.errors
        ? null
        : (Object.values(this.formGroup?.errors) as string[])
    )
  );

  /** Store templates in a map or record for easier access */
  public featureTemplates: Record<string, TemplateRef<any>> = {};

  /** Extract the contents of the template references and store in the templates property */
  @ContentChildren(TemplateRef<any>)
  set extractTemplates(val: QueryList<TemplateRef<any>>) {
    const templates = val.toArray();
    if (!templates.length) {
      return;
    }
    templates.forEach((template) => {
      // Extract the attributes of the ng-template
      // This approach is an alternative to using a directive
      // @todo - Switch to directive for extracting this property
      const attrs: string[] | null | undefined = (template as any)
        ?._declarationTContainer?.attrs;
      const key = attrs?.length ? attrs[1] : null; // Extract the key
      // Make sure a key exists
      if (!key) {
        console.error(
          'A supplied template was missing a feature id. Format is: <ng-template featureId="myId"></ng-template>'
        );
        return;
      }
      // Set a template
      this.featureTemplates[key] = template;
    });
  }

  /** When the user submits the form */
  @Output() buttonEvent = buttonEvent;

  /** When the user submits the form */
  @Output() completed = new EventEmitter<unknown>();

  ngOnInit(): void {
    if (
      this.options?.validator &&
      !this.formGroup?.hasValidator(this.options.validator as any)
    ) {
      this.formGroup?.addValidators(this.options.validator as any);
    }
  }

  /**
   * On form submit, run validation
   * @returns
   */
  public submit() {
    // SSR check
    if (is.node || !this.formGroup) return;
    this.hasSubmitted$.next(true); // Only run form validation on submit
    // Triggers update flag, needed in conjunction with markallastouched
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
      return;
    }

    // If set, scroll to top of page on successful submit. Default true
    if (this.options?.scrollToTopOnSubmit !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Emit updated form to parent. Parent can also get raw data from form group
    this.completed.emit(this.formGroup.getRawValue());
  }
}

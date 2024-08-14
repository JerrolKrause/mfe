import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

/** Extends formgroup interface to improve typing and add additional functionality */
interface FormGroupDynamic<T extends Record<string, any>> extends FormGroup {
  /** Add property interface typing to the .value property of the root formgroup */
  value: T;
  /** Resets the form with the default values used to initialize the original form. By default the .reset() method sets everything to null which may not be desirable. */
  resetDefaults: () => void;
}

/**
 * Utility type to make all properties of an interface nillable, including nested properties.
 */
type Nillable<T> = {
  [P in keyof T]: T[P] extends object
    ? Nillable<T[P]> | null | undefined
    : T[P] | null | undefined;
};

/**
 * Options for configuring the toFormGroup function.
 */
interface FormGroupOptions<T> {
  /**
   * A custom validator function for the form group.
   * Receives the form group's current value as an argument.
   * Should return `true` if the form is valid, or `false` if invalid.
   *
   * @param {T} value - The current value of the form group.
   * @returns {boolean} - Whether the form is valid.
   */
  validator?: (value: T) => boolean;
}

/**
 * Converts a JSON object or a JavaScript object to a type-safe Angular reactive form.
 * Automatically creates nested form groups and form arrays.
 * Preserves the correct input interface for the values property.
 * Optionally makes the input form model nullable via a generic parameter.
 * Ensures data read from the values property can correctly have null as an option.
 * Adds a resetDefaults method to restore the data used to initialize the form group.
 * Allows custom validation logic to be applied via the `validator` option.
 *
 * @template T - The type of the object to be converted to a form.
 * @template AllowNulls - Whether to make the form's fields nullable.
 * @param {T} data - The object to be converted to a form.
 * @param {FormGroupOptions<T>} [options] - Optional configuration for the form group.
 * @returns {FormGroupDynamic<T> | FormGroupDynamic<Nillable<T>>} - The generated FormGroup.
 *
 * @example
 * interface MyForm {
 *   name: string;
 *   age: number;
 *   address: {
 *     street: string;
 *     city: string;
 *   };
 *   hobbies: string[];
 * }
 *
 * const data: MyForm = {
 *   name: 'John',
 *   age: 30,
 *   address: {
 *     street: '123 Main St',
 *     city: 'Anytown'
 *   },
 *   hobbies: ['Reading', 'Hiking']
 * };
 *
 * const form = toFormGroup<MyForm, true>(data, {
 *   validator: (value) => value.age > 18, // Custom validation: age must be greater than 18
 * });
 *
 * console.log(form.value); // Logs the form's value with possible nulls
 * console.log(form.valid); // Logs whether the form is valid (based on the custom validator)
 *
 * // Check for custom validation errors
 * form.updateValueAndValidity(); // Manually trigger validation
 * if (form.errors?.customValidation) {
 *   console.log('Form is invalid according to the custom validator');
 * }
 */
export function toFormGroup<
  T extends Record<string, any>,
  AllowNulls extends boolean = false
>(
  data: AllowNulls extends true ? Nillable<T> : T,
  options?: FormGroupOptions<T>
): FormGroupDynamic<AllowNulls extends true ? Nillable<T> : T> {
  const fb = new FormBuilder();

  /**
   * Recursively builds form controls for the provided value.
   *
   * @param {any} value - The value to be converted to form controls.
   * @returns {AbstractControl} - The generated form control.
   */
  function buildFormControl(value: any): AbstractControl {
    if (Array.isArray(value)) {
      // Build form arrays
      return fb.array(value.map((v) => buildFormControl(v)));
    } else if (value !== null && typeof value === 'object') {
      // Build form groups
      const group: { [key: string]: AbstractControl } = {};
      Object.keys(value).forEach((key) => {
        group[key] = buildFormControl(value[key]);
      });
      return fb.group(group);
    } else {
      // Build form controls for primitives
      return fb.control(value);
    }
  }

  // Build the form group
  const formGroup = buildFormControl(data) as FormGroupDynamic<
    AllowNulls extends true ? Nillable<T> : T
  >;

  // Monkey patch a resetDefaults method. This will restore the original values supplied by the input model
  // By default the .reset() method sets everything to null which may not be desirable
  formGroup.resetDefaults = () => {
    formGroup.reset();
    formGroup.patchValue(data);
  };

  // Apply custom validator if provided
  if (options?.validator) {
    formGroup.setValidators(() => {
      const isValid = options.validator!(formGroup.value as T);
      return isValid ? null : { customValidation: true };
    });
  }

  return formGroup;
}

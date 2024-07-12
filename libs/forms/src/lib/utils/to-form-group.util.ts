import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

/** Extends formgroup interface to improve typing and add additonal functionality */
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
 * Converts a JSON object or a JavaScript object to a type-safe Angular reactive form.
 * Automatically creates nested form groups and form arrays.
 * Preserves the correct input interface for the values property.
 * Optionally makes the input form model nullable via an input argument.
 * Ensures data read from the values property can correctly have null as an option.
 * Adds a resetDefaults method to restore the data used to initialize the form group.
 *
 * @template T - The type of the object to be converted to a form.
 * @param {T} data - The object to be converted to a form.
 * @param {boolean} [allowNulls=false] - Optional flag to allow nullable properties.
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
 * const form = toFormGroup<MyForm>(data, true);
 * console.log(form.value); // Logs the form's value with possible nulls
 */
export function toFormGroup<T extends Record<string, any>>(
  data: T
): FormGroupDynamic<T>;
export function toFormGroup<T extends Record<string, any>>(
  data: Nillable<T>,
  allowNulls: true
): FormGroupDynamic<Nillable<T>>;
export function toFormGroup<T extends Record<string, any>>(
  data: T,
  allowNulls?: false
): FormGroupDynamic<T>;
export function toFormGroup<T extends Record<string, any>>(
  data: T | Nillable<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _allowNulls = false // allowNulls not used, just used to make the input model nillable via argument
): FormGroupDynamic<T | Nillable<T>> {
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

  const formGroup = buildFormControl(data) as FormGroupDynamic<T>;
  // Monkey patch a reset defaults method. This will restore the original values supplied by the input model
  // By default the .reset() method sets everything to null which may not be desirable
  formGroup.resetDefaults = () => {
    formGroup.reset();
    formGroup.patchValue(data);
  };
  return formGroup;
}

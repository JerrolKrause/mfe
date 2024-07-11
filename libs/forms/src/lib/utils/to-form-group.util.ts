import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

/** Add property interface typing to the .value property of the root formgroup */
interface FormGroupDynamic<T extends Record<string, any>> extends FormGroup<T> {
  value: T;
}

/**
 * Utility type to make all properties of an interface nillable.
 */
type Nillable<T> = {
  [P in keyof T]?: T[P] | null | undefined;
};

/**
 * Converts a JSON object or a JavaScript object to a type-safe Angular reactive form.
 *
 * @template T - The type of the object to be converted to a form.
 * @param {T} data - The object to be converted to a form.
 * @returns {FormGroup} - The generated FormGroup.
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
 * const form = toFormGroup<MyForm>(data);
 * console.log(form.value); // Logs the form's value
 */
export function toFormGroup<T extends Record<string, any>>(data: T) {
  const fb = new FormBuilder();

  /**
   * Recursively builds form controls for the provided value.
   *
   * @param {any} value - The value to be converted to form controls.
   * @returns {AbstractControl} - The generated form control.
   */
  function buildFormControl(value: any): AbstractControl {
    if (Array.isArray(value)) {
      return fb.array(value.map((v) => buildFormControl(v)));
    } else if (value !== null && typeof value === 'object') {
      const group: { [key: string]: AbstractControl } = {};
      Object.keys(value).forEach((key) => {
        group[key] = buildFormControl(value[key]);
      });
      return fb.group(group);
    } else {
      return fb.control(value);
    }
  }

  const formGroup = buildFormControl(data) as FormGroupDynamic<Nillable<T>>;
  return formGroup;
}

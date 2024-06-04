import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isRequired } from './_base.validators';

/**
 * Mark a field as required: IE not null/undefined/empty string
 * @param control
 * @returns
 */
export const requiredValidator = (
  control: AbstractControl
): ValidationErrors | null => isRequired(control?.value);

/**
 * Require a valid email address
 * @param control
 * @returns
 */
export const emailValidator = (control: AbstractControl) => {
  const value = control.value;
  const reg = /^([a-z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
  if (value && !reg.test(value)) {
    return {
      email: 'Please enter a valid email address',
    };
  }
  return null;
};

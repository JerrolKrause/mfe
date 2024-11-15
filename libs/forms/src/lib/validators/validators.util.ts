import { AbstractControl, FormControl } from '@angular/forms';
import { FormsLib } from '../forms.model';
import { charsIsEqualToValidator } from './src/chars.validators';
import { emailValidator, requiredValidator } from './src/misc.validators';

/**
 * Dynamically attach validators to a form control. Will check for existing control first
 * @param formControl
 * @param validators
 */
export const validatorsAdd = (
  formControl?: FormControl | null,
  validators?: FormsLib.Validators | null
) => {
  if (!formControl || !validators) {
    return;
  }
  // Ensure type safety
  const keys = Object.keys(validators) as Array<keyof typeof validators>;

  // Loop through keys, attach typesafe validators
  // Only add if validator hasn't already been added
  keys.forEach((key) => {
    const value = validators[key];

    if (key === 'required' && !formControl.hasValidator(requiredValidator)) {
      formControl.addValidators(requiredValidator);
    }

    if (key === 'email' && !formControl.hasValidator(emailValidator)) {
      formControl.addValidators(emailValidator);
    }

    if (
      key === 'equalChars' &&
      typeof value === 'number' &&
      charsIsEqualToValidator(value) &&
      !formControl.hasValidator(charsIsEqualToValidator(value))
    ) {
      formControl.addValidators(charsIsEqualToValidator(value));
    }

    // Custom validator
    if (key === 'custom' && validators?.custom) {
      formControl.addValidators((control: AbstractControl) => {
        if (!validators?.custom) {
          return null;
        }
        return validators.custom(control);
      });
    }

    if (key === 'password') {
      console.log('Need to wire this up');
    }

    if (key === 'mustMatch') {
      console.log('Need to wire this up');
    }

    if (key === 'maxLength') {
      console.log('Need to wire this up');
    }
  });
};

/**
 * TODO: Not tree shakable
 */
// export const Validators = {
//   /** Set a control as required */
//   required: required,
//   /** Require a valid email address */
//   email: email,
//   /** Create an async validator */
//   async: async,
//   /** Validations based on the characters  */
//   Chars: {
//     /**  Characters must be equal to */
//     isEqualTo: charsIsEqualTo,
//     /** Must have characters greater than */
//     // isGreaterThan: charsIsGreaterThan,
//     /** Must have characters less than */
//     //  isLessThan: charsIsLessThan,
//   },
//   Date: {},
//   Number: {
//     //   isGreaterThan: numberIsGreaterThan,
//     isLessThan: numberIsLessThan,
//   },
// };

import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

/**
 * Automatically generate a form group complete with controls from JSON or a JS object. Will recurse through nested objects/arrays.
 * @param model - An object or JSON of the model. Can contain nested objects and arrays
 */
export function jsonToFormGroup<T extends object>(model: T): FormGroup {
  const formModel: { [key in keyof T]?: AbstractControl } = {};

  // Iterate through all props in model
  Object.keys(model).forEach((key) => {
    const value = model[key as keyof T];
    if (isObject(value) && !Array.isArray(value)) {
      formModel[key as keyof T] = jsonToFormGroup(value);
    } else if (Array.isArray(value)) {
      // Form array, recurse
      const formArray = value.map((item) => jsonToFormGroup(item));
      formModel[key as keyof T] = new FormArray(formArray);
    } else {
      // Normal value
      formModel[key as keyof T] = new FormControl(value);
    }
  });

  return new FormGroup(formModel as any);
}

function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}

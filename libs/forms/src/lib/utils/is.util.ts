import { SelectItem } from 'primeng/api';
import { FormsLib } from '../forms.model';

declare const process: any;

/**
 * Typeguards for form field types
 */
export const is = {
  stringOrNumber: (
    value: unknown | null | undefined
  ): value is string | number =>
    typeof value === 'string' || typeof value === 'number',
  nill: <T>(value: T | null | undefined): value is T =>
    value === null || value === undefined,
  notNill: <T>(value: T | null | undefined): value is T =>
    value !== null && value !== undefined,
  node:
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null,
  browser: typeof process === 'undefined',
  rule: (val?: unknown | null): val is FormsLib.Rule => {
    if (
      val &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      'field' in val &&
      'operator' in val &&
      'value' in val
    ) {
      return true;
    }
    return false;
  },
  selectItemArray: (val?: unknown | null): val is SelectItem[] => {
    if (
      val &&
      Array.isArray(val) &&
      // eslint-disable-next-line no-prototype-builtins
      ((typeof val[0] === 'object' && val[0].hasOwnProperty('value')) ||
        !val.length)
    ) {
      return true;
    }
    return false;
  },
  /**
   * Is this value a SelectItem
   * @param val
   * @returns
   */
  selectItem: (val?: unknown | null): val is SelectItem => {
    if (
      val &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      // eslint-disable-next-line no-prototype-builtins
      val.hasOwnProperty('value')
    ) {
      return true;
    }
    return false;
  },
  contentType: {
    html: (obj: any): obj is FormsLib.Html =>
      obj && obj.type === 'html' && typeof obj.html === 'string',
    button: (obj: any): obj is FormsLib.Button =>
      obj && obj.type === 'button' && typeof obj.label === 'string',
    formField: (obj: any): obj is FormsLib.FormField =>
      obj.type === 'formField' &&
      obj.formFieldType !== undefined &&
      obj.field !== undefined,
  },
};

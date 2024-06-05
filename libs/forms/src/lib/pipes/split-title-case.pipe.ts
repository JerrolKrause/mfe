import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert string (usually an enum) into a properly spaced value by looking at upper case letters
 * IE "SignedPurchaseContract" => "Signed Purchase Contract"
 * USAGE: {{ value | splitTitleCase }}
 * @param phrase
 * @returns
 */
@Pipe({
  name: 'splitTitleCase',
})
export class SplitTitleCasePipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value === 'string') {
      return String(value || '')
        .split('')
        .map((c) => (c === c.toUpperCase() ? ' ' + c : c))
        .join('')
        .trim();
    }
    return value;
  }
}

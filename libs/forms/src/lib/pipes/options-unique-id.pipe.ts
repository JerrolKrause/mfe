import { Pipe, PipeTransform } from '@angular/core';
import { FormsLib } from '../forms.model';
import { slugCreate } from '../utils';

/**
 * Converts a field option value into a unique identifier slug.
 * This pipe is useful for generating unique identifiers for field options.
 *
 * @usageNotes
 *
 * ```html
 * {{ option | oid }}
 * ```
 *
 * ```html
 * {{ option | oid: i }}
 * ```
 */
@Pipe({
  name: 'oid',
})
export class OptionsUniqueId implements PipeTransform {
  /**
   * Transforms a field option value into a unique identifier slug.
   *
   * @param option - The field option to transform.
   * @param i - Optional parameter representing a numerical value used to generate uniqueness. Defaults to a random number if not provided.
   * @returns A unique identifier slug based on the provided field option.
   *
   * @example
   *
   * // Assuming option is an instance of FormsLib.FieldOptions and i is a numerical value.
   * const uniqueId = value | oid;
   *
   * // With a custom numerical value
   * const uniqueId = value | oid:5;
   */
  transform(
    option: FormsLib.FieldOptions,
    i?: number | null,
    maxLength?: number | null
  ): string {
    let slug = slugCreate(
      'f-' + '-' + (i ?? 0) + option.value + '-' + option.label
    );
    if (maxLength) {
      slug = slug.substring(0, maxLength);
    }
    return slug;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to access deeply nested properties of an object using a dot-separated string path.
 *
 * @example
 * // Assume we have the following object in the component:
 * myObject = {
 *   property1: {
 *     property2: {
 *       property3: 'Deep Value',
 *     },
 *   },
 * };
 *
 * // In the template, you can use the pipe like this:
 * {{ myObject | deepProperty: 'property1.property2.property3' }}  // Output: 'Deep Value'
 *
 * // You can also provide a fallback value in case the path does not exist:
 * {{ myObject | deepProperty: 'property1.property2.nonExistent' : 'Fallback Value' }}  // Output: 'Fallback Value'
 */
@Pipe({
  name: 'deepProperty',
})
export class DeepPropertyPipe implements PipeTransform {
  transform(value: any, path: string): any {
    if (!value || !path) {
      return null;
    }

    const properties = path.split('.');

    return properties.reduce((acc, prop) => {
      return acc && acc[prop] !== undefined ? acc[prop] : null;
    }, value);
  }
}

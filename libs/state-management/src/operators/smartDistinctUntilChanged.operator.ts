import { Observable, OperatorFunction } from 'rxjs';
declare const process: any;
/**
 * A custom RXJS operator that can be used to check if the current emission from an observable stream is the same as the previous emission. Unlike the standard distinctUntilChanged operator, this operator recursively evaluates arrays and objects to see if they match, even if the memory value isn't identical via "===".
 *
 * #### Limitations ####
 * - May be costly for large objects or arrays, use distinctUntilChanged with a custom comparator if that's the case
 * - Will not work for classes or complex objects with accessors or methods
 * @param source
 */
export function smartDistinctUntilChanged<T>(): OperatorFunction<T, T> {
  let previousValue: T;
  return (source: Observable<T>) =>
    new Observable<T>((observer) => {
      return source.subscribe({
        next: (value) => {
          if (!isEqual(value, previousValue)) {
            observer.next(value);
            // Check that structuredClone is available for deep cloning
            if (isStructuredCloneAvailable()) {
              previousValue = structuredClone(value);
            } else {
              // Using parse/stringify works for simple examples but is problematic for things complex objects with methods or circular references
              // Used for older browsers
              previousValue = JSON.parse(JSON.stringify(value));
            }
          }
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
}

/**
 * Compares two values to see if they are equal. Supports primitive values, objects, and arrays.
 * @param a The first value to compare
 * @param b The second value to compare
 * @returns Returns true if the values are equal, false otherwise.
 */
const isEqual = (a?: unknown, b?: unknown): boolean => {
  // Primitives, memory value matches or nil value matches
  if (a === b) return true;
  // Nill non matches
  if (a == null || b == null || a == undefined || b == undefined) return false;

  // Objects
  if (
    typeof a === 'object' &&
    a !== null &&
    typeof b === 'object' &&
    b !== null
  ) {
    const aObj = a as { [key: string]: unknown };
    const bObj = b as { [key: string]: unknown };
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);

    if (aKeys.length !== bKeys.length) return false;

    // Iterate through all the keys, and compare each key's value
    for (let i = 0; i < aKeys.length; i++) {
      const key = aKeys[i];

      // eslint-disable-next-line no-prototype-builtins
      if (!bObj.hasOwnProperty(key)) return false;

      if (!isEqual(aObj[key], bObj[key])) return false;
    }

    return true;

    // Arrays
  } else if (Array.isArray(a) && Array.isArray(b)) {
    // Check array length
    if (a.length !== b.length) return false;
    // Loop through the array and compare all nested values
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }
  return false;
};

/** Node JS check for SSR */
export const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;
export const isBrowser = !isNode;

/** Check if isStructuredCloneAvailable is available in the API */
const isStructuredCloneAvailable = () => {
  return (
    isBrowser &&
    typeof window !== 'undefined' &&
    typeof window.postMessage === 'function' &&
    typeof window.Worker !== 'undefined'
  );
};

import { FormsLib } from '$forms';

export const rvAssetForm: FormsLib.FormGenerator = [
  {
    type: 'container',

    content: [
      {
        type: 'html',
        html: '<h2>RV Information</h2>',
      },
    ],
  },
];

/**
 * A type that recursively generates all possible valid paths for a given nested object type.
 * The paths are represented as strings and include support for arrays and nested objects.
 *
 * @template T - The type of the nested object.
 * @template Prev - The accumulated path string (used internally for recursion).
 *
 * @example
 * interface NestedObject {
 *   level1: {
 *     level2: Array<{
 *       level3: {
 *         prop1: string;
 *         prop2: number;
 *       };
 *     }>;
 *   };
 * }
 *
 * // Generates valid paths such as:
 * // 'level1', 'level1.level2', 'level1.level2[0]', 'level1.level2[0].level3', 'level1.level2[0].level3.prop1', etc.
 * type ValidPaths = NestedPaths<NestedObject>;
 *
 * const path1: ValidPaths = 'level1'; // Valid
 * const path2: ValidPaths = 'level1.level2'; // Valid
 * const path3: ValidPaths = 'level1.level2[0]'; // Valid
 * const path4: ValidPaths = 'level1.level2[0].level3'; // Valid
 * const path5: ValidPaths = 'level1.level2[0].level3.prop1'; // Valid
 * const path6: ValidPaths = 'level1.level2[1].level3.prop2'; // Valid
 * const invalidPath: ValidPaths = 'level1.invalidLevel2[0].level3.prop1'; // Type error
 */
type NestedPaths<T, Prev extends string = ''> =
  | Prev
  | {
      [K in keyof T]: T[K] extends Array<infer U>
        ?
            | `${Prev}${Prev extends '' ? '' : '.'}${string & K}`
            | `${Prev}${Prev extends '' ? '' : '.'}${string & K}[${number}]`
            | NestedPaths<
                U,
                `${Prev}${Prev extends '' ? '' : '.'}${string & K}[${number}]`
              >
        : T[K] extends object
        ?
            | `${Prev}${Prev extends '' ? '' : '.'}${string & K}`
            | NestedPaths<
                T[K],
                `${Prev}${Prev extends '' ? '' : '.'}${string & K}`
              >
        : `${Prev}${Prev extends '' ? '' : '.'}${string & K}`;
    }[keyof T];

interface NestedObject {
  level1: {
    level2: {
      level3: {
        prop1: string;
        prop2: number;
      };
    }[];
  };
}

type ValidPaths = NestedPaths<NestedObject>;
// Example usage:
const validPath1: ValidPaths = 'level1.level2[0].level3.prop1'; // Valid
const validPath2: ValidPaths = 'level1.level2[1].level3.prop2'; // Valid
// const invalidPath1: ValidPaths = 'level1.level2[0].invalidProp'; // Type error
// const invalidPath2: ValidPaths = 'level1.level2[1].level3.prop3'; // Type error

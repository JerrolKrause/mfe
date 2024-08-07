import { FormGroup } from '@angular/forms';
/**
 * Add ability to supply form model to formgroup instances
 */

// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
export module FormsLib {
  /** Main form generator model, generic type currently not supported due to infinite recusions issue. Perhaps in a later version of TS */
  export type FormGenerator = FormContentTypes;

  type FormContentTypes = (Content | Row | Container)[];

  /** Base properties that apply to all content types  */
  interface FormContentTypeSrc {
    type: string;
    /** CSS ID to apply to the parent container of this element*/
    id?: string | null;
    /** CSS classes to apply to the parent container of this element. Uses [ngClass] */
    cssClasses?: string | null;
    /** Inline style to apply to the parent container of this element.  Uses [ngStyle]  */
    inlineStyles?: Record<string, string> | null;
    /**
     * Is the control visible. Supports boolean, a string going to a form control with a truthy/falsy value or a Rule
     *
     * String values support the use of "!" to reverse the truthy or falsey value. IE `visible: '!isActive'`
     *
     * @example
     *
     // Boolean
     visible: true
     // A field in the model, will be dynamically evaluated as truthy or falsey
     visible: 'loan.loanPurpose'
     // A field in the model, will be dynamically evaluated as reverse of truthy or falsey
     visible: '!loan.loanPurpose'
     // Rules engine example, see operators for supported operations
     visible: {
        field: 'loan.loanPurposeType',
        operator: 'eq',
        value: 'Purchase',
      }
     */
    visible?: DynamicProperty;
  }

  /** Supported values for evaluating dynamic properties */
  export type DynamicProperty = null | boolean | string | Rule;

  export interface FormOptions {
    /** Do not show footer including submit button */
    hideFooter?: boolean | null;
    /** Change the style of the submit button */
    submitButton?: {
      /** Do not show the submit button */
      hide?: boolean | null;
      /** Text label */
      label?: string | null;
      /** Icon to use */
      icon?: string | null;
      /** Any custom css classes */
      classes?: string | null;
    };
    /** Scroll to the top of the page on a successful form submission. Default true. */
    scrollToTopOnSubmit?: boolean | null;
    /** When the user clicks the submit button and an error occurs, the page will scroll to the first error. This value will modify the final position of the scroll and can be negative or positive. Useful for situactions where the error is under a sticky header or fixed element. */
    errorScrollOffset?: number | null;
  }

  /** Container is used for wrapping or grouping other content types */
  export interface Container extends FormContentTypeSrc {
    type: 'container';
    content: FormContentTypes;
  }

  export interface Row extends FormContentTypeSrc {
    type: 'row';
    columns: Column[];
  }

  export interface Column extends FormContentTypeSrc {
    type: 'column';
    width: number;
    content: Content[];
  }

  /** ContainerContent is a dupe of Container. This is a workaround for circular dependencies */
  export interface ContainerContent extends FormContentTypeSrc {
    type: 'container';
    content: Content[];
  }

  export type Content = Html | FormField | ContainerContent | Button;

  export interface Html extends FormContentTypeSrc {
    type: 'html';
    html: string;
  }

  export interface Button extends FormContentTypeSrc {
    type: 'button';
    /** Label text of the button */
    label: string;
    /** A command to execute when the button is clicked. First value is the root formgroup, second value is this button model */
    cmd: (response: { formGroup: FormGroup; button: Button | null }) => void;
    /** An optional property to store any meta data which will be passed to the cmd method along with the button */
    data?: any;
    /** Add a top margin to the button which will make it inline with a form field that has a label. True will use the default option of 1.5rem, otherwise specify the offset as a valid value for margin-top. */
    offsetTop?: boolean | Record<string, string>;
  }

  /** Available form field types */
  export type FormField =
    | TextField
    | PasswordField
    | DateField
    | CheckboxField
    | SelectButtonField
    | DropdownField
    | PhoneNumberField
    | EmailField
    | NumberField
    | RadioField
    | TextAreaField
    | ZipCodeField;

  /** Enum for form field types */
  export type FormFieldType =
    | 'text'
    | 'checkbox'
    | 'password'
    | 'date'
    | 'selectButton'
    | 'dropdown'
    | 'phoneNumber'
    | 'email'
    | 'number'
    | 'radio'
    | 'textarea'
    | 'zipcode';

  export interface FieldOptions {
    label: string;
    value: any;
  }

  /** Props that apply to all form field types, IE input, dropdown, radio, etc */
  interface FieldProps extends FormContentTypeSrc {
    // Required props
    type: 'formField';
    /** Which type of form element is this */
    formFieldType: FormFieldType;
    /** Path/location in the form group of the form control using Angular dot notation, IE `user.data.firstname` */
    field: string;
    // Optional props
    /** Label that appears above the control */
    label?: string | null;
    /** Text to use for ID attribute */
    id?: string | null;
    /** Small text that appears beneath the control */
    hint?: string | null;
    /** A unique ID to use to help facilitate automated testing. Can be different than ID if ID is fixed */
    automationId?: string | null;
    /**  */
    validators?: Validators | null;
    /**
       * Is the control disabled. Supports boolean, a string going to a form control with a truthy/falsy value or a Rule
       *
       * String values support the use of "!" to reverse the truthy or falsey value. IE `visible: '!isActive'`
       *
       * @example
       *
       // Boolean, static
       disabled: true
       // A field in the model, will be dynamically evaluated as truthy or falsey
       disabled: 'loan.loanPurpose'
       // A field in the model, will be dynamically evaluated as reverse of truthy or falsey
       disabled: '!loan.loanPurpose'
       // Rules engine example, see operators for supported operations
       disabled: {
          field: 'loan.loanPurposeType',
          operator: 'eq',
          value: 'Purchase',
        }
       */
    disabled?: DynamicProperty;
  }

  export interface Validators {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    /** Must match the value in another form control exactly */
    mustMatch?: string;
    password?: {
      uppercase?: boolean;
      lowercase?: boolean;
      number?: boolean;
      specialChar?: boolean;
    };
  }

  // Props that apply to only allow typed user input, IE inputs but not dropdowns or radios
  interface FieldInputSrc extends FieldProps {
    // Optional props
    /** Standard html placeholder text */
    placeholder?: string | null;
    /** Is this control focused */
    focused?: boolean | null;
    /** An icon of text that will appear BEFORE the input */
    prefix?: string | null;
    /** An icon of text that will appear AFTER the input */
    suffix?: string | null;
    /** Text to use for name attribute */
    name?: string | null;
  }

  export interface TextField extends FieldInputSrc {
    formFieldType: 'text';
    /** The MAXIMUM number of characters allowed by this input */
    maxLength?: number | null;
    /** The MINIMUM number of characters allowed by this input */
    minLength?: number | null;
  }

  export interface PasswordField extends FieldInputSrc {
    formFieldType: 'password';
    /** The MAXIMUM number of characters allowed by this input */
    maxLength?: number | null;
    /** The MINIMUM number of characters allowed by this input */
    minLength?: number | null;
  }

  export interface TextAreaField extends FieldInputSrc {
    formFieldType: 'textarea';
    /** 	When present, textarea size expands vertically as the user types */
    autoResize?: boolean | null;
    columns?: number | null;
    rows?: number | null;
    /** Max # of characters allowed in the text area */
    maxlength?: number | null;
  }

  export interface PhoneNumberField extends FieldInputSrc {
    formFieldType: 'phoneNumber';
  }

  export interface CheckboxField extends FieldInputSrc {
    formFieldType: 'checkbox';
  }

  export interface ZipCodeField extends FieldInputSrc {
    formFieldType: 'zipcode';
    /** Determine if the value should be either a string or a number. Default string. Number is only supported if allowNineDigitCodes isn't true since the hyphen is required */
    dataType?: 'string' | 'number' | null;
    /** Allow the 9 digit postal code instead of limiting it to 5 digits. IE "92618-1234". The hyphen will only be added if the 6th digit or more is added. Default false */
    allowNineDigitCodes?: boolean | null;
  }

  export interface DateField extends FieldInputSrc {
    formFieldType: 'date';
    // Prime config options
    inline?: boolean | null;
    showIcon?: boolean | null;
    dateFormat?: string | null;
  }

  // TODO: Get union type for requiring EITHER options OR datafield
  // Current error: TS2589: Type instantiation is excessively deep and possibly infinite.
  type Options = { options: FieldOptions[] };
  type Datafield = { datafield: string };
  type FieldPropsOptions = Options | Datafield;
  /** Field props for controls that need an array of data like selects or radios */
  // type FieldPropsOptions = FieldProps & temp3;

  // export type SelectButtonField = SelectButtonFieldSrc & FieldPropsOptions;
  export interface SelectButtonField extends FieldProps {
    formFieldType: 'selectButton';
    options?: FieldOptions[];
    datafield?: string;
    // Prime config options
    multiple?: boolean | null;
    dataKey?: string | null;
    canUnselect?: boolean | null;
    /** Should the button span the entire horizontal space and have all buttons be equal width? Default true */
    fullWidth?: boolean | null;
  }

  // export type DropdownField = DropdownFieldSrc & FieldPropsOptions;
  export interface DropdownField extends FieldProps {
    formFieldType: 'dropdown';
    options: FieldOptions[];
    datafield?: string | null;
    /** Height of the dropdown box */
    scrollHeight?: string | null;
    /** Append to this element */
    appendTo?: any | null;
    /** Only show visible elements. Useful for large lists */
    virtualScroll?: boolean | null;
    /** Show an X in the menu allowing a user to deselect */
    showClear?: boolean | null;
    /** Standard html placeholder text */
    placeholder?: string | null;
    /** If true, inserts an empty option with the label of the placeholder and a value of null at the top of the list. Essentially a selectable null option  */
    insertEmptyOption?: boolean | null;
  }

  // export type RadioField = RadioFieldSrc & FieldPropsOptions;
  export interface RadioField extends FieldProps {
    formFieldType: 'radio';
    options?: FieldOptions[];
    datafield?: string;
  }

  export interface EmailField extends FieldInputSrc {
    formFieldType: 'email';
  }

  /** Datafields are dynamic options for populating fields from a remote source like an API */
  export type Datafields = Record<string, FieldOptions[]>;

  export interface NumberField extends FieldInputSrc {
    formFieldType: 'number';
    /** The MAXIMUM number of characters allowed by this input */
    maxLength?: number | null;
    mode?: 'decimal' | 'currency';
    currencySymbol?: string | null;
    useGrouping?: boolean | null;

    showButtons?: boolean | null;
    min?: number | null;
    max?: number | null;
    minFractionDigits?: number | null;
    maxFractionDigits?: number | null;
    buttonLayout?: 'stacked' | 'horizontal' | 'vertical' | null;
  }

  export interface Rule {
    field: string;
    operator: 'eq' | 'ne' | 'in' | 'nin' | 'gt' | 'lt';
    value: unknown;
  }

  /** @todo Implement for the field property to enforce type safety
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
}

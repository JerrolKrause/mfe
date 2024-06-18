import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  computed,
  effect,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  of,
  startWith,
  tap,
} from 'rxjs';

import { toObservable } from '@angular/core/rxjs-interop';
import { isRequired } from '../../../utils';
import { expressionReplacer$ } from '../../../utils/expression-replacer.util';
import { validatorsAdd } from '../../../validators';
import { BaseFormFieldComponent } from '../form-field.base';
interface InputState {
  hasData: boolean;
  showErrors: boolean;
  isValid: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  required: boolean;
  errors: any[] | null;
}

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent<t>
  extends BaseFormFieldComponent<t>
  implements OnDestroy
{
  // Dynamic content
  public label$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, label: this.label }))
  ).pipe(
    mergeMap(({ formGroup, label }) =>
      expressionReplacer$(formGroup(), label())
    )
  );
  public prefix$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, prefix: this.prefix }))
  ).pipe(
    mergeMap(({ formGroup, prefix }) =>
      expressionReplacer$(formGroup(), prefix())
    )
  );
  public suffix$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, suffix: this.suffix }))
  ).pipe(
    mergeMap(({ formGroup, suffix }) =>
      expressionReplacer$(formGroup(), suffix())
    )
  );
  public hint$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, hint: this.hint }))
  ).pipe(
    mergeMap(({ formGroup, hint }) => expressionReplacer$(formGroup(), hint()))
  );

  public inputState$ = toObservable(computed(() => this.formControl)).pipe(
    mergeMap((formControl) =>
      combineLatest({
        hasData: formControl.valueChanges.pipe(
          tap((value) => this.onChange.emit(value)), // Emit changed value to parent through template
          startWith(formControl.value),
          debounceTime(1),
          map((val) => val !== null && val !== undefined && val !== ''),
          distinctUntilChanged()
        ),
        showErrors: formControl.statusChanges.pipe(
          startWith(formControl?.status),
          debounceTime(1),
          map((x) => x === 'INVALID' && !!formControl?.touched),
          distinctUntilChanged()
        ),
        isValid: formControl.statusChanges.pipe(
          startWith(formControl?.status),
          debounceTime(1),
          map((x) => x === 'VALID'),
          distinctUntilChanged()
        ),
        isDisabled: formControl.statusChanges.pipe(
          startWith(formControl?.status),
          debounceTime(1),
          map((x) => x === 'DISABLED'),
          distinctUntilChanged()
        ),
        isInvalid: formControl.statusChanges.pipe(
          startWith(formControl?.status),
          debounceTime(1),
          map((x) => x === 'INVALID'),
          distinctUntilChanged()
        ),
        errors: formControl.statusChanges.pipe(
          startWith(formControl?.errors),
          debounceTime(1),
          map(() => {
            if (!formControl?.errors) {
              return null;
            }
            return Object.keys(formControl.errors).reduce(
              (a, b) =>
                formControl?.errors ? [...a, formControl?.errors[b]] : [...a],
              [] as string[]
            );
          })
        ),
        required: of(isRequired(formControl)),
      })
    ),
    debounceTime(1)
  );

  /** DOM element for showing required status */
  public requiredTag = `<sup class="required">*</sup>`;

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
    // Add validators from form model
    // May need to defer execution if triggers ExpressionChangedAfterItHasBeenCheckedError error
    effect(() => validatorsAdd(this.formControl, this.validators));
  }
}

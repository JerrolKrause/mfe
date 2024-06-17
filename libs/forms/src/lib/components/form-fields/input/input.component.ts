import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  computed,
  effect,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
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
  implements OnInit, OnChanges, OnDestroy
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

  // Main state entity
  public inputState$: Observable<InputState | null> =
    new BehaviorSubject<InputState | null>(null);

  /** DOM element for showing required status */
  public requiredTag = `<sup class="required">*</sup>`;

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
    // Add validators from form model
    // May need to defer execution if triggers ExpressionChangedAfterItHasBeenCheckedError error
    effect(() => validatorsAdd(this.formControl, this.validators));
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup'] || changes['control']) {
      this.inputState$ = combineLatest({
        hasData: this.formControl.valueChanges.pipe(
          tap((value) => this.onChange.emit(value)), // Emit changed value to parent through template
          startWith(this.formControl.value),
          debounceTime(1),
          map((val) => val !== null && val !== undefined && val !== ''),
          distinctUntilChanged()
        ),
        showErrors: this.formControl.statusChanges.pipe(
          startWith(this.formControl?.status),
          debounceTime(1),
          map((x) => x === 'INVALID' && !!this.formControl?.touched),
          distinctUntilChanged()
        ),
        isValid: this.formControl.statusChanges.pipe(
          startWith(this.formControl?.status),
          debounceTime(1),
          map((x) => x === 'VALID'),
          distinctUntilChanged()
        ),
        isDisabled: this.formControl.statusChanges.pipe(
          startWith(this.formControl?.status),
          debounceTime(1),
          map((x) => x === 'DISABLED'),
          distinctUntilChanged()
        ),
        isInvalid: this.formControl.statusChanges.pipe(
          startWith(this.formControl?.status),
          debounceTime(1),
          map((x) => x === 'INVALID'),
          distinctUntilChanged()
        ),
        errors: this.formControl.statusChanges.pipe(
          startWith(this.formControl?.errors),
          debounceTime(1),
          map(() => {
            if (!this.formControl?.errors) {
              return null;
            }
            return Object.keys(this.formControl.errors).reduce(
              (a, b) =>
                this.formControl?.errors
                  ? [...a, this.formControl?.errors[b]]
                  : [...a],
              [] as string[]
            );
          })
        ),
        required: of(isRequired(this.formControl)),
      }).pipe(debounceTime(1));
    }
  }
}

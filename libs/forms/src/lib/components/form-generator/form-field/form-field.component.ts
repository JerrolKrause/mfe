import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { mergeMap } from 'rxjs';
import { FormsLib } from '../../../forms.model';
import { dynamicPropertyEvaluation$ } from '../../../utils/dynamic-property-evaluation.util';
import { FormGeneratorBaseComponent } from '../form-generator.base';

@Component({
  selector: 'lib-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent extends FormGeneratorBaseComponent {
  @Input() formField?: FormsLib.FormField | null = null;

  /** Dynamically determine visibility */
  public visible$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, formField: this.formField }))
  ).pipe(
    mergeMap(({ formGroup, formField }) =>
      dynamicPropertyEvaluation$(formField?.visible, formGroup)
    )
  );

  /** Dynamically determine enabled/disabled */
  public disabled$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, formField: this.formField }))
  ).pipe(
    mergeMap(({ formGroup, formField }) =>
      dynamicPropertyEvaluation$(formField?.disabled, formGroup, {
        // Check if the control is currently disabled and set that to the default setting
        defaultValue: formGroup?.get(formField?.field ?? '')?.disabled ?? false,
      })
    )
  );

  constructor() {
    super();
  }
}

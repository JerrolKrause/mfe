import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, mergeMap } from 'rxjs';
import { FormsLib } from '../../../forms.model';
import { is } from '../../../utils';
import { dynamicPropertyEvaluation$ } from '../../../utils/dynamic-property-evaluation.util';
import { FormGeneratorBaseComponent } from '../form-generator.base';

@Component({
  selector: 'lib-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent extends FormGeneratorBaseComponent {
  public row = input<FormsLib.Row>({ type: 'row', columns: [] });

  /** Dynamically determine visibility */
  public visible$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, row: this.row() }))
  ).pipe(
    mergeMap(({ formGroup, row }) =>
      dynamicPropertyEvaluation$(row?.visible, formGroup)
    )
  );

  /** Generate CSS classes */
  public cssClasses = computed(() => {
    let cssClasses = '';
    if (this.row()?.cssClasses) {
      cssClasses += this.row()?.cssClasses;
    }
    if (this.row()?.alignCenter) {
      cssClasses += ' form-generator-row-h-center';
    }
    return cssClasses;
  });

  /** Determine visibility of columns. Controlled here to avoid adding content to the dom in the columns component */
  public visibleColumns = computed(() => {
    return this.row()
      ? this.row()?.columns.map((c) =>
          is.notNill(c.visible)
            ? dynamicPropertyEvaluation$(c.visible, this.formGroup)
            : new BehaviorSubject(true)
        )
      : [];
  });

  constructor() {
    super();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { mergeMap } from 'rxjs';
import { FormsLib } from '../../../forms.model';
import { is } from '../../../utils';
import { dynamicPropertyEvaluation$ } from '../../../utils/dynamic-property-evaluation.util';
import { FormGeneratorBaseComponent } from '../form-generator.base';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends FormGeneratorBaseComponent {
  @Input() button?: FormsLib.Button | null = null;

  /** Dynamically determine visibility */
  public visible$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, button: this.button }))
  ).pipe(
    mergeMap(({ formGroup, button }) =>
      dynamicPropertyEvaluation$(button?.visible, formGroup)
    )
  );

  public is = is;

  constructor() {
    super();
  }

  /**
   * Execute the onclick event
   */
  public command() {
    if (this.button?.cmd) {
      this.button.cmd(this.button);
    }
  }
}

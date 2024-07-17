import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
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
  public button = input<FormsLib.Button | null>(null);

  /** Compute the inline styles of the button by combining any custom styles with an easy button spacing toggle */
  public inlineStyles = computed<Record<string, string>>(() => {
    const offsetTop = this.button()?.offsetTop;
    if (offsetTop === true) {
      // If a button is inline/in the same row as a text field, adding some margin will ensure it aligns with the text field not the label
      return { ...this.button()?.inlineStyles, marginTop: '1.5rem' };
    } else if (typeof offsetTop === 'object') {
      // If using a custom offset, merge with any default inline styling
      return { ...this.button()?.inlineStyles, ...offsetTop };
    }
    return { ...this.button()?.inlineStyles };
  });

  /** Dynamically determine visibility */
  public visible$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, button: this.button }))
  ).pipe(
    mergeMap(({ formGroup, button }) =>
      dynamicPropertyEvaluation$(button()?.visible, formGroup)
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
    if (this.button()?.cmd) {
      this.button()?.cmd({ formGroup: this.formGroup, button: this.button() });
    }
  }
}

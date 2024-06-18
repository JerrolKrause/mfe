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
import { expressionReplacer$ } from '../../../utils/expression-replacer.util';
import { FormGeneratorBaseComponent } from '../form-generator.base';

@Component({
  selector: 'lib-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlComponent extends FormGeneratorBaseComponent {
  @Input() content?: FormsLib.Html | null = null;

  /** Dynamically determine visibility */
  public visible$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, content: this.content }))
  ).pipe(
    mergeMap(({ formGroup, content }) =>
      dynamicPropertyEvaluation$(content?.visible, formGroup)
    )
  );

  /** HTML content with support for dynamic properties */
  public html$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, content: this.content }))
  ).pipe(
    mergeMap(({ formGroup, content }) =>
      expressionReplacer$(formGroup, content?.html)
    )
  );

  constructor() {
    super();
  }
}

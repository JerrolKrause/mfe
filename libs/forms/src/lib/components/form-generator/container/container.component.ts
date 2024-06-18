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
  selector: 'lib-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent extends FormGeneratorBaseComponent {
  @Input() container?: FormsLib.Container | null = null;

  /** Dynamically determine visibility */
  public visible$ = toObservable(
    computed(() => ({ formGroup: this.formGroup, container: this.container }))
  ).pipe(
    mergeMap(({ formGroup, container }) =>
      dynamicPropertyEvaluation$(container?.visible, formGroup)
    )
  );

  constructor() {
    super();
  }
}

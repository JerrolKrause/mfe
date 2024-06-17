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

/**
 * This container is an example dupe of the container component
 * Angular does not allow circular nested components so this is a workaround to allow containers on a form field level
 */
@Component({
  selector: 'lib-container-content',
  templateUrl: './container-content.component.html',
  styleUrls: ['./container-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerContentComponent extends FormGeneratorBaseComponent {
  /** Container model */
  @Input() container?: FormsLib.ContainerContent | null = null;

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

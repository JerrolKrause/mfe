import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsLib } from '../../../forms.model';
import { is } from '../../../utils';
import { dynamicPropertyEvaluation$ } from '../../../utils/dynamic-property-evaluation.util';

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
export class ContainerContentComponent implements OnInit, OnChanges {
  @Input() container?: FormsLib.ContainerContent | null = null;
  @Input() formGroup = new FormGroup({});
  @Input() options?: FormsLib.FormOptions | null = null;
  /** Datafields for dynamic data */
  @Input() datafields?: FormsLib.Datafields | null = {};

  public visible$: Observable<boolean> = new BehaviorSubject(true);
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['formGroup'] &&
      this.formGroup &&
      is.notNill(this.container?.visible)
    ) {
      this.visible$ = dynamicPropertyEvaluation$(
        this.container?.visible,
        this.formGroup
      );
    }
  }
}

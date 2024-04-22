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

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() button?: FormsLib.Button | null = null;
  @Input() formGroup = new FormGroup({});

  /** Datafields for dynamic data */
  @Input() datafields?: FormsLib.Datafields | null = {};

  public visible$: Observable<boolean> = new BehaviorSubject(true);

  public is = is;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Execute the onclick event
   */
  public command() {
    if (this.button?.cmd) {
      this.button.cmd(this.button);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only update observable if visible is present
    if (
      changes['formGroup'] &&
      this.formGroup &&
      is.notNill(this.button?.visible)
    ) {
      this.visible$ = dynamicPropertyEvaluation$(
        this.button?.visible,
        this.formGroup
      );
    }
  }
}

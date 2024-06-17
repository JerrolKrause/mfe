import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsLib } from '../../forms.model';

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGeneratorBaseComponent {
  @Input() formGroup = new FormGroup({});
  /** Datafields for dynamic data */
  @Input() datafields?: FormsLib.Datafields | null = {};
  /** Form options */
  @Input() options?: FormsLib.FormOptions | null = null;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsLib } from '../../../forms.model';
import { is } from '../../../utils';
import { FormGeneratorBaseComponent } from '../form-generator.base';

@Component({
  selector: 'lib-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent extends FormGeneratorBaseComponent {
  @Input() content?: FormsLib.Content | null = null;

  public is = is;
  constructor() {
    super();
  }
}

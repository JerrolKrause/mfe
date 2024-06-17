import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormsLib } from '../../../forms.model';
import { is } from '../../../utils';
import { FormGeneratorBaseComponent } from '../form-generator.base';

@Component({
  selector: 'lib-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent
  extends FormGeneratorBaseComponent
  implements OnInit
{
  @Input() column?: FormsLib.Column | null = null;

  public is = is;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}

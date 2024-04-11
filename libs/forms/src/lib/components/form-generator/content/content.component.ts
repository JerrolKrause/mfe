import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsLib } from '../../../forms.model';
import { is } from '../../../utils';

@Component({
  selector: 'lib-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  @Input() content?: FormsLib.Content | null = null;
  @Input() formGroup = new FormGroup({});
  @Input() options?: FormsLib.FormOptions | null = null;
  /** Datafields for dynamic data */
  @Input() datafields?: FormsLib.Datafields | null = {};

  public is = is;
  constructor() {}

  ngOnInit(): void {}
}

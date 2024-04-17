import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-v2',
  templateUrl: './v2.component.html',
  styleUrl: './v2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class V2Component {
  public page = 1;
}

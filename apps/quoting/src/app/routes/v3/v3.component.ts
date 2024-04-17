import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-v3',
  templateUrl: './v3.component.html',
  styleUrl: './v3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class V3Component {}

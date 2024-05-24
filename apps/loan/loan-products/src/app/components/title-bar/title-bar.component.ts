import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent {}

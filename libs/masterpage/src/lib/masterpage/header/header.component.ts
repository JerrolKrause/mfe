import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { hostID: crypto.randomUUID().toString() },
})
export class HeaderComponent {
  @Input() fullWidth = true;
}

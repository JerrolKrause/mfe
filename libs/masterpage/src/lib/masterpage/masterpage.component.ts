import { Component, Input } from '@angular/core';
@Component({
  selector: 'lib-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.scss',
})
export class MasterpageComponent {
  @Input() fullWidth = false;
  @Input() showNav = true;
  @Input() showLeftCol = true;

  public leftColOpen = true;
}

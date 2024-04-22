import { Component, Input } from '@angular/core';
@Component({
  selector: 'lib-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css',
})
export class MasterpageComponent {
  @Input() fullWidth = false;
  @Input() showNav = true;
}

import { Component, ViewEncapsulation } from '@angular/core';
import { SocketService } from './shared/socket-io.service';

@Component({
  selector: 'app-quoting',
  templateUrl: './quoting.component.html',
  styleUrl: './quoting.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'quoting';

  constructor(private socketService: SocketService) {}
}

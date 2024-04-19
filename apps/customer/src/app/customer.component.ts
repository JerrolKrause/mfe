import { SocketService } from '$state-management';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent implements OnDestroy {
  title = 'customer';
  constructor(private socket: SocketService) {
    this.socket.initialize('http://localhost:3000');
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}

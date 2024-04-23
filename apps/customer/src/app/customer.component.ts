import { SocketService } from '$state-management';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent implements OnInit, OnDestroy {
  constructor(private socket: SocketService) {
    this.socket.initialize('http://localhost:3000');
  }

  ngOnInit(): void {
    this.socket.registerUser('customer');
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}

import { UserIds } from '$shared';
import { SocketService } from '$state-management';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TeamMemberComponent implements OnInit, OnDestroy {
  constructor(private socket: SocketService) {
    this.socket.initialize('http://localhost:3000');
  }

  ngOnInit(): void {
    this.socket.registerUser(UserIds.teamMember);
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}

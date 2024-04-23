import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TeamMemberComponent {
  title = 'team-member';
}

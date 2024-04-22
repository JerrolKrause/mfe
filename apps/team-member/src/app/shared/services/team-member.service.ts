import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface LPState {}

@Injectable({ providedIn: 'root' })
export class TeamMemberService {
  public state$ = new BehaviorSubject<LPState>({});
}

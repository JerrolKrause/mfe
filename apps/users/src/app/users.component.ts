import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/stores/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private svc: ApiService) {}

  ngOnInit(): void {
    this.svc.state$.subscribe((x) => {
      if (!x) {
        return;
      }
      console.warn(x);
    });
  }

  public userAdd() {
    this.svc
      .userCreate({ username: 'Test', name: 'Test', email: 'test@test.com' })
      .subscribe();
  }

  public refresh() {
    this.svc.refresh().subscribe();
  }

  public userUpdate() {
    this.svc
      .userUpdate('1', {
        email: 'eat@joes.com',
      })
      .subscribe();
  }
}

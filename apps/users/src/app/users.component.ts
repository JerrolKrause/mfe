import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/stores/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(public svc: ApiService) {}

  ngOnInit(): void {
    this.svc.state$.subscribe((x) => {
      console.warn(x.data);
    });
    // this.svc.usersStore.getData().subscribe();
  }

  public userAdd() {
    this.svc.usersStore
      .createData({ username: 'Test', name: 'Test', email: 'test@test.com' })
      .subscribe();
    /**
    this.svc
      .userCreate({ username: 'Test', name: 'Test', email: 'test@test.com' })
      .subscribe();
       */
  }

  public refresh() {
    // this.svc.usersStore.refresh().subscribe();
  }

  public userUpdate() {
    this.svc.usersStore
      .updateData('1', {
        email: 'eat@joes.com',
        username: 'test@test.com',
      })
      .subscribe();
  }

  public userDelete() {
    this.svc.usersStore.deleteData('1').subscribe();
  }
}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GetUsersDocument,
  GetUsersQuery,
  User,
} from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public users?: (User | null)[] | null = [];
  constructor(private apollo: Apollo) {
    this.usersGet();
  }

  public usersGet() {
    this.apollo
      .watchQuery<GetUsersQuery>({
        query: GetUsersDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.users = data?.users?.data;
        console.log(this.users);
      });
  }
}

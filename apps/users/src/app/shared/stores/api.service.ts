import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  from,
  map,
  take,
  tap,
} from 'rxjs';
import {
  CreateUserDocument,
  CreateUserMutation,
  GetUsersDocument,
  GetUsersQuery,
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
  User,
} from '../models/models';

interface State {
  loading: boolean;
  error: null | string;
  modifying: boolean;
  modifyError: null | string;
}

@Injectable()
export class ApiService {
  /** API State */
  private _state$ = new BehaviorSubject<State>({
    loading: false,
    error: null,
    modifying: false,
    modifyError: null,
  });

  /** User State */
  public state$ = combineLatest([
    this.apollo
      .watchQuery<GetUsersQuery>({
        query: GetUsersDocument,
      })
      .valueChanges.pipe(map((response) => response.data.users?.data ?? null)),
    this._state$,
  ]).pipe(
    debounceTime(1),
    map(([data, state]) => ({
      data,
      ...state,
    }))
  );

  constructor(private apollo: Apollo) {}

  /**
   * Change API state
   * @param stateNew
   */
  private stateChange(stateNew: Partial<State>) {
    this._state$
      .pipe(take(1))
      .subscribe((stateOld) => this._state$.next({ ...stateOld, ...stateNew }));
  }

  /**
   *
   */
  public usersGet() {
    this.stateChange({ loading: true });
    return this.apollo
      .watchQuery<GetUsersQuery>({
        query: GetUsersDocument,
      })
      .valueChanges.pipe(tap(() => this.stateChange({ loading: false })));
  }

  /**
   * Refresh cached users
   * @returns
   */
  public refresh() {
    this.stateChange({ loading: true });
    return from(
      this.apollo.client.refetchQueries({
        include: 'active',
      })
    ).pipe(tap(() => this.stateChange({ loading: false })));
  }

  /**
   * Create a new user
   * @param user
   * @returns
   */
  public userCreate(user: Partial<User>) {
    this.stateChange({ modifying: true });
    return this.apollo
      .mutate<CreateUserMutation>({
        // Use the mutation response type here
        mutation: CreateUserDocument,
        variables: {
          input: user,
        },
        update: (cache, { data }) => {
          const existingUsers = cache.readQuery<GetUsersQuery>({
            query: GetUsersDocument,
          });
          if (existingUsers && data?.createUser) {
            cache.writeQuery<GetUsersQuery>({
              query: GetUsersDocument,
              data: {
                users: {
                  ...existingUsers.users,
                  data: [
                    ...(existingUsers?.users?.data || []),
                    data.createUser,
                  ],
                },
              },
            });
          }
        },
      })
      .pipe(tap(() => this.stateChange({ modifying: false })));
  }

  /**
   * Update existing user
   * @param userId
   * @param userData
   * @returns
   */
  userUpdate(userId: string, userData: UpdateUserInput) {
    this.stateChange({ modifying: true });
    return this.apollo
      .mutate<UpdateUserMutation>({
        // Use the mutation response type here
        mutation: UpdateUserDocument,
        variables: {
          id: userId,
          input: userData,
        },
        update: (cache, { data }) => {
          const existingUsers = cache.readQuery<GetUsersQuery>({
            query: GetUsersDocument,
          });
          if (existingUsers && data?.updateUser) {
            const updatedUsersData = (existingUsers?.users?.data || []).map(
              (user) =>
                user?.id === data.updateUser?.id ? data.updateUser : user
            );

            cache.writeQuery<GetUsersQuery>({
              query: GetUsersDocument,
              data: {
                users: {
                  ...existingUsers.users,
                  data: updatedUsersData as any,
                },
              },
            });
          }
        },
      })
      .pipe(tap(() => this.stateChange({ modifying: false })));
  }
}

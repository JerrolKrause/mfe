import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';
import {
  CreateUserDocument,
  DeleteUserDocument,
  GetUsersDocument,
  GetUsersQuery,
  UpdateUserDocument,
  UpdateUserInput,
  User,
} from '../models/models';

import { GraphQLStoreCreatorService, State } from '$state-management';

type UserState = State.EntityApiState<any>;

@Injectable()
export class ApiService {
  /** API State */
  private _state$ = new BehaviorSubject({
    loading: false,
    error: null,
    modifying: false,
    errorModify: null,
  });

  /** User State
  public state2$: Observable<UserState> = combineLatest([
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
      entities: {},
    }))
  );
  */

  public usersStore = this.graphSvc.createEntityStore<User>({
    primaryKey: 'id',
    getQuery: GetUsersDocument,
    createQuery: CreateUserDocument,
    updateQuery: UpdateUserDocument,
    deleteQuery: DeleteUserDocument,
    getResultKey: 'users',
    createResultKey: 'createUser',
    updateResultKey: 'updateUser',
    deleteResultKey: 'deleteUser',
  });

  /**
  public usersStore = this.graph.createEntityStore<any>(
    { uniqueId: 'id' },
    GetUsersDocument,
    CreateUserDocument
  ); */

  public state$ = this.usersStore.state$;

  constructor(
    private apollo: Apollo,
    private graphSvc: GraphQLStoreCreatorService
  ) {}

  /**
   * Change API state
   * @param stateNew
   */
  private stateChange(stateNew: Partial<UserState>) {
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

  public refresh() {
    this.usersStore.refresh().subscribe();

    this.stateChange({ loading: true });
    return from(
      this.apollo.client.refetchQueries({
        include: 'active',
      })
    ).pipe(tap(() => this.stateChange({ loading: false })));

  }*/

  /**
   * Create a new user
   * @param user
   * @returns
   */
  public userCreate(user: Partial<User>) {
    this.usersStore.createData(user).subscribe();
    /**
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
       */
  }

  /**
   * Update existing user
   * @param userId
   * @param userData
   * @returns
   */
  userUpdate(userId: string, user: UpdateUserInput) {
    this.usersStore.updateData(userId, user).subscribe();
    /**
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
       */
  }
}

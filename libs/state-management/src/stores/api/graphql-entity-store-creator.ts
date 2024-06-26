import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

/**
 * ## ACTION ITEMS ##
 * - Switch to map function instead of results keys?
 * - Fix some "any" typing issues
 * - Add more configurable options to the config. Reorganized into keys and queries
 * - Remove empty state on initial load
 */

export interface GraphQLStoreState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
  operationLoading: boolean;
  operationError: string | null;
}

export interface GraphQLStoreConfig<T> {
  // Queries
  getQuery?: DocumentNode;
  createQuery?: DocumentNode;
  updateQuery?: DocumentNode;
  deleteQuery?: DocumentNode;
  // Keys
  getResultKey?: string;
  createResultKey?: string;
  updateResultKey?: string;
  deleteResultKey?: string;
  primaryKey?: keyof T;
  /** If the store has a subscriber but no data, should it automatically request from the API? Default true. */
  autoLoad?: boolean;
}

/**
 * A generic store for managing CRUD operations and state with a GraphQL server.
 */
export class GraphQLStore<T> {
  /**
   * @private
   * @type {BehaviorSubject<GraphQLStoreState<T>>}
   * The BehaviorSubject that holds the state of the store. It emits the current state
   * every time there's an update to the state. The initial state is set with all properties
   * defaulted to indicate no loading, no error, and no data.
   */
  private stateSubject$ = new BehaviorSubject<GraphQLStoreState<T>>({
    loading: false, // Indicates whether a global loading state is active.
    data: null, // The current data held in the store, initialized to null.
    error: null, // Any error that has occurred in fetching or manipulating the data.
    operationLoading: false, // Indicates if there is a loading state for individual operations like create, update, or delete.
    operationError: null, // Error state for individual CRUD operations.
  });

  /**
   * @public
   * @type {Observable<GraphQLStoreState<T>>}
   * The observable derived from the stateSubject$, which any component or service
   * can subscribe to, to get the latest state updates. It includes a debounceTime to
   * minimize the number of emissions it makes in a very short time, improving performance.
   * The tap operator checks if this is the first subscription without existing data and
   * triggers the initial data loading if necessary.
   */
  public state$ = this.stateSubject$.pipe(
    debounceTime(1), // Introduces a minimal delay between successive emissions to handle rapid state changes efficiently.
    tap((state) => {
      // This checks if there's no ongoing loading, no existing data, and if the initial load hasn't been triggered yet.
      if (
        state.loading === false &&
        state.data === null &&
        this.initialLoad === false &&
        this.config.autoLoad !== false
      ) {
        this.initialLoad = true; // Set to true to prevent future autoloading on the first subscription.
        this.getData().pipe(take(1)).subscribe(); // Fetches data and subscribes once, ensuring the data is loaded on initial access.
      }
    })
  );

  /** Keep track of if an initial load was performed. Only do once. */
  private initialLoad = false;

  constructor(private apollo: Apollo, private config: GraphQLStoreConfig<T>) {}

  /**
   * Retrieves data from a GraphQL server using a predefined query specified in the configuration.
   * This method initiates the fetching process, sets the loading state to true at the beginning,
   * and handles the state update based on the result of the fetch operation.
   *
   * The method employs the Apollo client's `watchQuery` method to observe the data. It processes
   * the data through a series of RxJS operators to manage state updates and error handling.
   *
   * ### Usage Examples:
   *
   * Assuming an instance of a class using this method is created and the configuration is set for a specific data model,
   * here's how you might use this function:
   *
   * ```typescript
   * // Assume you have an instance of the class called `store`.
   * // Subscribing to the data:
   * store.getData().subscribe();
   *
   * // Do not use the data returned from this response, subscribe to the state$ observable instead.
   * store.state$.subscribe()
   *
   * // To use this method effectively, ensure that the `config.getQuery` is defined,
   * // and `config.getResultKey` is correctly set to match the key in the GraphQL response that
   * // contains the desired data array.
   * ```
   *
   * @returns {Observable<T>} An observable that emits the array of data fetched from the server.
   * This observable will complete after emitting once or if an error occurs.
   */
  getData(variables?: Record<string, any>): Observable<T | null> {
    if (!this.config.getQuery) {
      console.error('getQuery was not provided to the store config');
      return of(null);
    }

    this.updateState({ loading: true, error: null });
    return this.apollo
      .watchQuery<{ [key: string]: any }>({
        query: this.config.getQuery,
        variables: variables,
      })
      .valueChanges.pipe(
        map((result) =>
          this.config?.getResultKey
            ? result.data[this.config?.getResultKey]
            : result.data
        ),
        catchError((error) => {
          this.updateState({ loading: false, error: error.message });
          throw error;
        }),
        map((data) => {
          this.updateState({ loading: false, data });
          return data;
        }),
        take(1)
      );
  }

  /**
   * Submits new data to the server via a GraphQL mutation and updates the local state upon successful creation.
   * This method handles the creation of new data entries by submitting them through a configured GraphQL mutation.
   * It sets the operation loading state before initiating the mutation and updates the store's state with the new data returned by the server.
   * If the mutation fails, it captures and logs the error while updating the operation error state.
   *
   * ### Usage Examples:
   *
   * Assuming you have a class instance `store` and `T` is the type of the data model (e.g., User, Product):
   *
   * ```typescript
   * const newUser = {
   *   name: 'John Doe',
   *   email: 'john.doe@example.com'
   * };
   *
   * // Call createData to add a new user
   * store.createData(newUser).subscribe((data) => {
   *     if (data) {
   *       console.log('New user created:', data);
   *     } else {
   *       console.log('No data returned from the creation operation');
   *     }
   *   },
   *   error: (error) => console.error('Failed to create new user:', error)
   * );
   * ```
   *
   * Ensure that the `config.createQuery` is defined in your store configuration and `config.createResultKey`
   * matches the key in the GraphQL response that contains the created object.
   *
   * @param {T} input The new data entry to be created. This should match the structure expected by the GraphQL mutation.
   * @returns {Observable<T | null>} An observable that emits the newly created data object. It emits `null` if
   * the mutation response does not include the new data (indicating an unsuccessful creation or a misconfiguration).
   * This observable will complete after emitting once or if an error occurs.
   */
  createData(input: T): Observable<T | null> {
    if (!this.config.createQuery) {
      console.error('createQuery was not provided to the store config');
      return of(null);
    }
    this.updateState({ operationLoading: true, operationError: null });
    return this.apollo
      .mutate<{ [key: string]: T }>({
        mutation: this.config.createQuery,
        variables: { input },
      })
      .pipe(
        withLatestFrom(this.stateSubject$),
        map(([response, state]) => {
          const newData = response.data?.[this.config.createResultKey ?? ''];
          if (!newData) {
            this.updateState({
              operationLoading: false,
              operationError: 'Creation unsuccessful',
            });
            return null;
          }
          // Update state only if there was previously existing data
          if (state.data && Array.isArray(state.data)) {
            this.updateState({
              data: [...state.data, newData] as unknown as T,
              operationLoading: false,
            });
          } else {
            this.updateState({
              data: newData as unknown as T,
              operationLoading: false,
            });
          }
          return newData;
        }),
        catchError((error) => {
          this.updateState({
            operationLoading: false,
            operationError: error.message,
          });
          throw error;
        }),
        take(1)
      );
  }

  /**
   * Updates an existing data entry on the server using a GraphQL mutation and updates the local state upon successful update.
   * This method handles the modification of data by submitting changes through a GraphQL mutation configured in the store.
   * It sets the operation loading state to true at the start, updates the local state with the new data returned from the server,
   * and handles any errors that occur during the mutation process.
   *
   * ### Usage Examples:
   *
   * Assuming `store` is an instance of the class managing user data, where `User` is the data type:
   *
   * ```typescript
   * const userId = '123';
   * const userUpdates = {
   *   email: 'new.email@example.com'
   * };
   *
   * // Call updateData to modify an existing user
   * store.updateData(userId, userUpdates).subscribe( (data) => {
   *     if (data) {
   *       console.log('User updated:', data);
   *     } else {
   *       console.log('No data returned from the update operation');
   *     }
   *   },
   *   error: (error) => console.error('Failed to update user:', error)
   * );
   * ```
   *
   * Ensure that the `config.updateQuery` is properly defined in your store configuration and `config.updateResultKey`
   * matches the key in the GraphQL mutation response that contains the updated object.
   *
   * @param {string} id The ID of the data entry to be updated. This ID is used to locate the entry in the GraphQL backend.
   * @param {Partial<T>} input The changes to apply to the data entry. This should match the structure expected by the GraphQL mutation,
   *                            typically involving only the fields that are being updated.
   * @returns {Observable<T | null>} An observable that emits the updated data object. It emits `null` if
   * the mutation response does not include the updated data (indicating an unsuccessful update or a misconfiguration).
   * This observable will complete after emitting once or if an error occurs.
   */
  updateData(id: string, input: Partial<T>): Observable<T | null> {
    if (!this.config.updateQuery) {
      console.error('updateQuery was not provided to the store config');
      return of(null);
    }
    this.updateState({ operationLoading: true, operationError: null });

    return this.apollo
      .mutate<{ [key: string]: T }>({
        mutation: this.config.updateQuery,
        variables: { id, input },
      })
      .pipe(
        withLatestFrom(this.stateSubject$),
        map(([response, state]) => {
          const updatedData =
            response.data?.[this.config.updateResultKey ?? ''];
          if (!updatedData || !state.data) {
            this.updateState({
              operationLoading: false,
              operationError: 'Update unsuccessful',
            });
            return null;
          }

          const updatedItems = Array.isArray(state.data)
            ? (state.data.map((item) =>
                this.config.primaryKey && item[this.config.primaryKey] === id
                  ? { ...item, ...input }
                  : item
              ) as unknown as T)
            : updatedData;
          this.updateState({ data: updatedItems, operationLoading: false });
          return updatedData;
        }),
        catchError((error) => {
          this.updateState({
            operationLoading: false,
            operationError: error.message,
          });
          throw error;
        }),
        take(1)
      );
  }

  /**
   * Deletes an existing data entry from the server using a GraphQL mutation and updates the local state.
   * This method sends a delete request to the server based on the provided `id` and updates the local
   * state to remove the deleted item if the operation is successful. It also manages loading and error
   * states throughout the process.
   *
   * ### Usage Examples:
   *
   * Assuming `store` is an instance of the class managing data, where `Data` is the data type:
   *
   * ```typescript
   * const dataId = '123';
   *
   * // Call deleteData to remove an existing data entry
   * store.deleteData(dataId).subscribe((result) => {
   *     console.log('Data entry deleted successfully');
   *   },
   *   error: (error) => console.error('Failed to delete data entry:', error)
   * );
   * ```
   *
   * Ensure that the `config.deleteQuery` is properly defined in your store configuration.
   *
   * @param {string} id The ID of the data entry to be deleted. This ID is used to locate the entry in the GraphQL backend.
   * @returns {Observable<object | null>} An observable that emits an empty object `{}` if the deletion was successful,
   * indicating that the operation has completed. It emits `null` if no data is available in the state to filter or
   * if the deletion was unsuccessful, potentially indicating a misconfiguration or an issue with the server.
   */
  deleteData(id: string): Observable<object | null> {
    if (!this.config.deleteQuery) {
      console.error('deleteQuery was not provided to the store config');
      return of(null);
    }
    this.updateState({ operationLoading: true, operationError: null });

    return this.apollo
      .mutate<{ [key: string]: object }>({
        mutation: this.config.deleteQuery,
        variables: { id },
      })
      .pipe(
        withLatestFrom(this.stateSubject$),
        map(([_response, state]) => {
          if (!state.data) {
            this.updateState({
              operationLoading: false,
              operationError: 'No data available',
            });
            return null;
          }
          const filteredData = Array.isArray(state.data)
            ? (state.data.filter(
                (item) =>
                  this.config.primaryKey && item[this.config.primaryKey] !== id
              ) as unknown as T)
            : null;
          this.updateState({ data: filteredData, operationLoading: false });
          return {};
        }),
        catchError((error) => {
          this.updateState({
            operationLoading: false,
            operationError: error.message,
          });
          throw error;
        }),
        take(1)
      );
  }

  /**
   * Updates the state of the store by merging a partial state object into the current state.
   * This method takes a partial state object that represents only the fields that need to be updated
   * and merges it with the current state to form a new state. The operation is performed reactively:
   * it ensures that the update is based on the most recent state available.
   */
  private updateState(partialState: Partial<GraphQLStoreState<T>>): void {
    this.stateSubject$
      .pipe(take(1))
      .subscribe((statePrev) =>
        this.stateSubject$.next({ ...statePrev, ...partialState })
      );
  }
}

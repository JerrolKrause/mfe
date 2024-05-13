import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, debounceTime, map, take, tap } from 'rxjs/operators';

/**
 * ## ACTION ITEMS ##
 * - Switch to map function instead of results keys?
 * - Fix some "any" typing issues
 * - Add more configurable options to the config. Reorganized into keys and queries
 * - Remove empty state on initial load
 * - Remove stateSubject.value calls in main methods
 */

export interface GraphQLStoreState<T> {
  loading: boolean;
  data: T[] | null;
  error: string | null;
  operationLoading: boolean;
  operationError: string | null;
}

export interface GraphQLStoreConfig<T> {
  // Queries
  getQuery: DocumentNode;
  createQuery: DocumentNode;
  updateQuery: DocumentNode;
  deleteQuery: DocumentNode;
  // Keys
  getResultKey: string;
  createResultKey: string;
  updateResultKey: string;
  deleteResultKey: string;
  primaryKey: keyof T;
}

/**
 * A generic store for managing CRUD operations and state with a GraphQL server.
 */
export class GraphQLStore<T> {
  private stateSubject$ = new BehaviorSubject<GraphQLStoreState<T>>({
    loading: false,
    data: null,
    error: null,
    operationLoading: false,
    operationError: null,
  });

  public state$ = this.stateSubject$.pipe(
    debounceTime(1),
    // If no data is in the store on first subscription, autoload the store
    tap((state) => {
      if (
        state.loading === false &&
        state.data === null &&
        this.initialLoad === false
      ) {
        this.initialLoad = true;
        this.getData().pipe(take(1)).subscribe();
      }
    })
  );

  /** Keep track of if an initial load was performed. Only do once. */
  private initialLoad = false;

  constructor(private apollo: Apollo, private config: GraphQLStoreConfig<T>) {}

  private updateState(partialState: Partial<GraphQLStoreState<T>>): void {
    this.stateSubject$
      .pipe(take(1))
      .subscribe((statePrev) =>
        this.stateSubject$.next({ ...statePrev, ...partialState })
      );
  }

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
   *
   * // To use this method effectively, ensure that the `config.getQuery` is defined,
   * // and `config.getResultKey` is correctly set to match the key in the GraphQL response that
   * // contains the desired data array.
   * ```
   *
   * @returns {Observable<T[]>} An observable that emits the array of data fetched from the server.
   * This observable will complete after emitting once or if an error occurs.
   */
  getData(): Observable<T[]> {
    this.updateState({ loading: true, error: null });
    return this.apollo
      .watchQuery<{ [key: string]: any }>({
        query: this.config.getQuery,
      })
      .valueChanges.pipe(
        map((result) => result.data[this.config.getResultKey].data),
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

  // Create new data
  createData(input: T): Observable<T | null> {
    this.updateState({ operationLoading: true, operationError: null });
    return this.apollo
      .mutate<{ [key: string]: T }>({
        mutation: this.config.createQuery,
        variables: { input },
      })
      .pipe(
        catchError((error) => {
          this.updateState({
            operationLoading: false,
            operationError: error.message,
          });
          throw error;
        }),
        map((response) => {
          const newData = response.data?.[this.config.createResultKey];
          if (!newData || !this.stateSubject$.value.data) {
            return null;
          }
          this.updateState({
            data: [...this.stateSubject$.value.data, newData],
            operationLoading: false,
          });
          return newData;
        }),
        take(1)
      );
  }

  // Update existing data
  updateData(id: string, input: Partial<T>): Observable<T | null> {
    this.updateState({ operationLoading: true, operationError: null });
    return this.apollo
      .mutate<{ [key: string]: T }>({
        mutation: this.config.updateQuery,
        variables: { id, input },
      })
      .pipe(
        catchError((error) => {
          this.updateState({
            operationLoading: false,
            operationError: error.message,
          });
          throw error;
        }),
        map((response) => {
          const updatedData = response.data?.[this.config.updateResultKey];
          if (!updatedData || !this.stateSubject$.value.data) {
            return null;
          }
          const updatedItems = this.stateSubject$.value.data.map((item) =>
            item[this.config.primaryKey] === id ? { ...item, ...input } : item
          );
          this.updateState({ data: updatedItems, operationLoading: false });
          return updatedData;
        }),
        take(1)
      );
  }

  // Delete data
  deleteData(id: string): Observable<object | null> {
    this.updateState({ operationLoading: true, operationError: null });
    return this.apollo
      .mutate<{ [key: string]: object }>({
        mutation: this.config.deleteQuery,
        variables: { id },
      })
      .pipe(
        catchError((error) => {
          this.updateState({
            operationLoading: false,
            operationError: error.message,
          });
          throw error;
        }),
        map(() => {
          if (!this.stateSubject$.value.data) {
            return null;
          }
          const filteredData = this.stateSubject$.value.data.filter(
            (item) => item[this.config.primaryKey] !== id
          );
          this.updateState({ data: filteredData, operationLoading: false });
          return {};
        }),
        take(1)
      );
  }
}

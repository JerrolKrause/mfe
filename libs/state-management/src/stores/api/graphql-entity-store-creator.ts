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

  // Fetch data from the server
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

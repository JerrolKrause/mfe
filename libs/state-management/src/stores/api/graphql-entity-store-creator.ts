import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface GraphQLStoreState<T> {
  loading: boolean;
  data: T[];
  error: string | null;
  operationLoading: boolean;
  operationError: string | null;
}

export interface GraphQLStoreConfig<T> {
  getQuery: DocumentNode;
  createQuery: DocumentNode;
  updateQuery: DocumentNode;
  deleteQuery: DocumentNode;
  //
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
  private stateSubject = new BehaviorSubject<GraphQLStoreState<T>>({
    loading: false,
    data: [],
    error: null,
    operationLoading: false,
    operationError: null,
  });

  public state$ = this.stateSubject.asObservable();

  constructor(private apollo: Apollo, private config: GraphQLStoreConfig<T>) {}

  private updateState(partialState: Partial<GraphQLStoreState<T>>): void {
    this.stateSubject.next({ ...this.stateSubject.value, ...partialState });
  }

  // Fetch data from the server
  getData(): Observable<T[]> {
    this.updateState({ loading: true, error: null });
    return this.apollo
      .watchQuery<{ [key: string]: any }>({
        // TODO
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
        })
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
          if (!newData) {
            return null;
          }
          this.updateState({
            data: [...this.stateSubject.value.data, newData],
            operationLoading: false,
          });
          return newData;
        })
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
          if (!updatedData) {
            return null;
          }
          const updatedItems = this.stateSubject.value.data.map((item) =>
            item[this.config.primaryKey] === id ? { ...item, ...input } : item
          );
          this.updateState({ data: updatedItems, operationLoading: false });
          return updatedData;
        })
      );
  }

  // Delete data
  deleteData(id: string): Observable<object> {
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
          const filteredData = this.stateSubject.value.data.filter(
            (item) => item[this.config.primaryKey] !== id
          );
          this.updateState({ data: filteredData, operationLoading: false });
          return {};
        })
      );
  }
}

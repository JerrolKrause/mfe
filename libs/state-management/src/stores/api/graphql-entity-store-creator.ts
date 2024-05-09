import { Apollo, TypedDocumentNode } from 'apollo-angular';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  debounceTime,
  defer,
  from,
  map,
  mergeMap,
  share,
  take,
  tap,
  throwError,
} from 'rxjs';
import { State } from '../../state.models';
import { BaseStore } from '../base/base-store';
import { ApiEvents } from '../store.enums';
import { mergeConfig } from './api-store.utils';

export class graphQLEntityStore<t> extends BaseStore {
  /** Default entity API state */
  private get getStateEntitySrc(): State.EntityApiState<t> {
    return {
      loading: false,
      modifying: false,
      error: false,
      errorModify: false,
      data: null,
      entities: {},
    };
  }

  /** Store state object */
  // protected state: State.EntityApiState<t> = this.getStateEntitySrc;

  /** Returns both the api state and data */
  private _state$ = new BehaviorSubject(this.getStateEntitySrc);

  /**
   * Holds both the store data and api state in a single subscription
   */
  public state$: Observable<State.EntityApiState<any>> = combineLatest([
    this.apollo
      .watchQuery({
        query: this.GetDocument,
      })
      .valueChanges.pipe(
        map((response: any) => {
          console.log(response);

          return (response.data.users?.data as any[]) ?? null;
        })
      ),
    this._state$,
  ]).pipe(
    debounceTime(1),
    map(([data, state]) => ({
      ...state,
      data,
      entities: data.reduce(
        (acc, item) => ({ ...acc, [item[this.config.uniqueId]]: item }),
        {}
      ),
    }))
  );

  /** Store a shared reference to the http get request so it can be canceled and shared */
  private httpGet$ = this.apollo.watchQuery({
    // GetUsersQuery
    query: this.GetDocument,
  }).valueChanges;

  constructor(
    private apollo: Apollo,
    protected config: State.ConfigEntity,
    protected GetDocument: TypedDocumentNode<unknown, unknown>,
    protected CreateDocument: TypedDocumentNode<unknown, unknown>
  ) {
    super();
  }

  /**
   * Perform a get request to load data into the store
   * @param optionsSrct
   */
  public get(optionsOverride: State.Options = {}) {
    return this._get(optionsOverride);
  }

  /**
   * Request is a POST operation that functions a GET. A payload body is passed and the response is loaded into the store
   *
   * Useful for things like search requests that need parameters not in a query string
   * @param payload
   * @param optionsOverride

  public request<p = unknown>(payload: p, optionsOverride?: State.Options) {
    return this._get({ refresh: true, ...optionsOverride }, payload);
  }
  */

  /**
   * Perform a get request to load data into the store
   * @param optionsOverride
   * @param postPayload
   */
  private _get<t>(optionsOverride: State.Options = {}) {
    const options = mergeConfig(this.config, optionsOverride);
    return this._state$.pipe(
      mergeMap((state) => {
        // If data is null or refresh cache is requested, otherwise default to cache
        if (
          (state.data === null || options.refresh || !this.httpGet$) &&
          !state.loading
        ) {
          return this.httpGet$;
        }
        const httpGet$ = defer(() => {
          this.stateChange({ loading: true, error: null });
          return this.apollo
            .watchQuery({
              query: this.GetDocument,
            })
            .valueChanges.pipe(
              // Handle api success
              tap((r) => {
                // Map api response if requested
                const result =
                  this.config.map && this.config.map.get
                    ? this.config.map.get(r)
                    : r;
                const state: Partial<State.ApiState> = {
                  loading: false,
                  data: result,
                  errorModify: null,
                };
                let entities: Record<string, t> | null = null;
                // Check if this api response has entities, create entity property
                const config = this.config; // Run through typeguard so it doesn't need to be typechecked again in the reduce
                if (config.uniqueId && Array.isArray(result)) {
                  entities = <Record<string, t>>(
                    result.reduce(
                      (a, b) => ({ ...a, [b[String(config.uniqueId)]]: b }),
                      {}
                    )
                  );
                  state['entities'] = entities;
                }

                // Update state
                this.stateChange(state);
                // Dispatch event to the global scope
                if (this.config.storeId) {
                  this.dispatch({
                    type: ApiEvents.GET_SUCCESS,
                    storeId: this.config.storeId,
                    payload: r,
                  });
                }
              }),
              // Handle api errors
              catchError((err) => {
                // Update state
                this.stateChange({ loading: false, error: err });
                if (this.config.storeId) {
                  this.dispatch({
                    type: ApiEvents.GET_ERROR,
                    storeId: this.config.storeId,
                    payload: err,
                  });
                }
                return throwError(err);
              }),
              take(1), // Ensure http request only fires once since the memory reference is stored
              share() // If multiple components are requesting data at the same time, share the stream to avoid multiple http requests
            );
        });
        this.httpGet$ = httpGet$;
        return this.httpGet$;
      })
    );
  }

  public create(entity: Partial<t>) {
    this.stateChange({ modifying: true });
    return this.apollo
      .mutate({
        // Mutation response type
        mutation: this.CreateDocument,
        variables: {
          input: entity,
        },
        update: (cache, { data }: Record<string, any>) => {
          const existingRecord = cache.readQuery({
            query: this.GetDocument,
          }) as Record<string, any>;

          // Retrieve the first key from the object
          const firstKey = Object.keys(existingRecord)[0];
          if (!firstKey) {
            return; // No keys found, return undefined
          }
          // Access the nested object
          const existingData: { data: any[] } = existingRecord[firstKey];
          if (!existingData || typeof existingData !== 'object') {
            return; // No nested object or not an object type
          }

          // Extract the newly created data
          const dataNew = Object.values(data);
          // console.warn(dataNew);
          if (existingRecord && existingData.data.length) {
            /** */
            cache.writeQuery({
              query: this.GetDocument,
              data: {
                [firstKey]: {
                  ...existingData,
                  data: [...(existingData?.data || []), ...dataNew],
                },
              },
            });
          }
        },
      })
      .pipe(tap(() => this.stateChange({ modifying: false })));
  }

  public update() {
    // Temp
  }

  public delete() {
    // Temp
  }

  /**
   * Refresh cached data
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
   * Perform updates to the base state object, shallow only
   * @param state
   */
  private stateChange(state: Partial<State.ApiState>) {
    this._state$
      .pipe(take(1))
      .subscribe((stateOld) => ({ ...stateOld, ...state }));
  }
}

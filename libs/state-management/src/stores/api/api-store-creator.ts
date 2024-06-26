import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  share,
  take,
  tap,
} from 'rxjs/operators';
import { State } from '../../state.models';
import { isActionApi } from '../../utils/guards.util';
import { BaseStore } from '../base/base-store';
import { ApiActions, ApiEvents, StoreTypes } from '../store.enums';
import {
  apiUrlGet,
  canRefreshStoreData,
  deleteEntities,
  is,
  mergeConfig,
  mergeDedupeArrays,
  mergePayloadWithApiResponse,
} from './api-store.utils';

/**
 * TODO:
 * - Make fresh API call on error
 */

/**
 * Automatically create an api store to manage interaction between a local flux store and a remote api
 */
export class ApiStoreCreator<t> extends BaseStore {
  /** Default non-entity API state */
  private get getStateSrc(): State.ApiState<t> {
    return Object.assign(
      {},
      {
        loading: false,
        modifying: false,
        error: false,
        errorModify: false,
        data: null,
      }
    );
  }

  /** Default entity API state */
  private get getStateEntitySrc(): State.EntityApiState<t> {
    return Object.assign(
      {},
      {
        loading: false,
        modifying: false,
        error: false,
        errorModify: false,
        data: null,
        entities: {},
      }
    );
  }

  /** Store state object */
  protected state: State.ApiState<t> | State.EntityApiState<t> = this
    .isEntityStore
    ? this.getStateEntitySrc
    : this.getStateSrc;

  /** Returns both the api state and data */
  private _state$ = new BehaviorSubject(this.state);

  /**
   * Holds both the store data and api state in a single subscription
   */
  public state$ = this._state$.pipe(
    debounceTime(1),
    // Autoload data if a subscriber is present and no data is already in store
    // Will reload data if last request was an error or data in store is nill or empty array/object
    tap((s) => {
      if (
        this.config.autoLoad !== false &&
        canRefreshStoreData(s) &&
        this.autoloadInProgress === false
      ) {
        this.autoloadInProgress = true; // Set autoload in progress
        this.get()
          .pipe(take(1))
          .subscribe(
            // After completing API call, set in progress to false. Prevents infinite refresh loop
            () =>
              timer(1)
                .pipe(take(1))
                .subscribe(() => (this.autoloadInProgress = false)),
            () =>
              timer(1)
                .pipe(take(1))
                .subscribe(() => (this.autoloadInProgress = false))
          );
      }
    })
  );

  /** Is autoload request in flight */
  private autoloadInProgress = false;

  /** Listen to events being broadcast, handle events sent to this store or all stores */
  public override events$ = ApiStoreCreator._events$.pipe(
    filter(
      (a) =>
        isActionApi(a) &&
        (a.storeId === this.config.storeId ||
          a.storeId === StoreTypes.ALL ||
          a.storeId === StoreTypes.API_ONLY)
    ),
    tap((a) => {
      // Add typeguard for api actions
      if (!isActionApi(a)) {
        return;
      }
      switch (a.type) {
        // Refresh data in store
        case ApiActions.GET:
          this.get(a.options).subscribe();
          break;
        // Perform POST request
        case ApiActions.POST:
          this.post(a.payload, a.options).subscribe();
          break;
        // Perform PUT request
        case ApiActions.PUT:
          this.put(a.payload, a.options).subscribe();
          break;
        // Perform PATCH request
        case ApiActions.PATCH:
          this.patch(a.payload, a.options).subscribe();
          break;
        // Perform DELETE request
        case ApiActions.DELETE:
          this.delete(a.payload, a.options).subscribe();
          break;
        // Refresh data in store
        case ApiActions.REFRESH:
          this.refresh(a.options).subscribe();
          break;
        // Reset store
        case ApiActions.RESET:
          this.reset();
          break;
      }
    })
  );

  /** Store a shared reference to the http get request so it can be canceled and shared */
  private httpGet$ = this.http.get<t>(apiUrlGet(this.config, 'get', null));

  constructor(
    private http: HttpClient,
    protected config: State.ConfigApi | State.ConfigEntity,
    private isEntityStore = true
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
   */
  public request<p = unknown>(payload: p, optionsOverride?: State.Options) {
    return this._get({ refresh: true, ...optionsOverride }, payload);
  }

  /**
   * Perform a get request to load data into the store
   * @param optionsOverride
   * @param postPayload
   */
  private _get<t>(optionsOverride: State.Options = {}, postPayload?: unknown) {
    const options = mergeConfig(this.config, optionsOverride);
    // If data is null or refresh cache is requested, otherwise default to cache
    if (
      (this.state.data === null || options.refresh || !this.httpGet$) &&
      !this.state.loading
    ) {
      const url = apiUrlGet(options, 'get', null);
      // Set loading to true, reset  errors
      this.stateChange({ loading: true, error: null });
      // Dispatch event to the global scope
      if (this.config.storeId) {
        this.dispatch({
          type: ApiEvents.GET_START,
          storeId: this.config.storeId,
          payload: null,
        });
      }
      // Is this a GET request or a POST that functions as a GET
      // Some data request require a post body
      // TODO: Fix any
      const httpRequest = postPayload
        ? this.http.post<any>(url, postPayload)
        : this.http.get(url);
      this.httpGet$ = httpRequest.pipe(
        // Handle api success
        tap((r) => {
          // Map api response if requested
          const result =
            this.config.map && this.config.map.get ? this.config.map.get(r) : r;
          const state: Partial<State.ApiState> = {
            loading: false,
            data: result,
            errorModify: null,
          };
          let entities: Record<string, t> | null = null;
          // Check if this api response has entities, create entity property
          const config = this.config; // Run through typeguard so it doesn't need to be typechecked again in the reduce
          if (
            this.isEntityStore &&
            is.entityConfig(config) &&
            config.uniqueId &&
            Array.isArray(result)
          ) {
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
    }
    return this.httpGet$;
  }

  /**
   * Perform a POST request
   * @param data
   * @param optionsOverride
   * @returns
   */
  public post(data: Partial<t>, optionsOverride: State.Options = {}) {
    const options = mergeConfig(this.config, optionsOverride);
    const url = apiUrlGet(options, 'post', null);
    return this.upsert(
      this.http.post(url, data),
      data,
      this.config.map?.post
    ) as Observable<Partial<t>>;
  }

  /**
   * Perform a PUT request
   * @param data
   * @param optionsOverride
   * @returns
   */
  public put(data: Partial<t>, optionsOverride: State.Options = {}) {
    const options = mergeConfig(this.config, optionsOverride);
    const url = apiUrlGet(options, 'put', data);
    return this.upsert(
      this.http.put(url, data),
      data,
      this.config.map?.put
    ) as Observable<Partial<t>>;
  }

  /**
   * Perform a PATCH request
   * @param data
   * @param optionsOverride
   * @returns
   */
  public patch(data: Partial<t>, optionsOverride: State.Options = {}) {
    const options = mergeConfig(this.config, optionsOverride);
    const url = apiUrlGet(options, 'patch', data);
    return this.upsert(
      this.http.patch(url, data),
      data,
      this.config.map?.patch
    ) as Observable<Partial<t>>;
  }

  /**
   * Perform a DELETE request
   * @param data
   * @param optionsOverride
   * @returns
   */
  public delete(
    data: Partial<t> | string,
    optionsOverride: State.Options = {}
  ) {
    const options = mergeConfig(this.config, optionsOverride);
    const url = apiUrlGet(options, 'delete', data);
    // Reset state
    this.stateChange({ modifying: true, errorModify: null });
    return this.http.delete<unknown>(url).pipe(
      // Most deletes shouldn't have a return but sometimes it's necessary
      tap((r) => {
        // Check if this is an entity store
        if (
          this.isEntityStore &&
          is.entityConfig(this.config) &&
          !!this.state?.data &&
          Array.isArray(this.state.data)
        ) {
          // Delete entities from store
          const updated = deleteEntities<t>(
            this.state.data,
            data,
            this.config.uniqueId as keyof t
          );
          this.stateChange({ modifying: false, ...updated });
        } else {
          // Delete on a non entity format
          this.stateChange({ modifying: false, data: r || null });
        }
      }),
      // Handle error
      catchError((err) => {
        // Update state
        this.stateChange({ modifying: false, errorModify: err });
        return throwError(err);
      })
    );
  }

  /**
   * Flatten all PUT/POST/PATCH requests into an upsert for simplicity
   * @param apiRequest
   * @param data
   * @returns
   */
  private upsert<t>(
    apiRequest: Observable<t>,
    data: t,
    mapFn?: <t>(x: t | null) => unknown
  ): Observable<Partial<t>> {
    // Reset state
    this.stateChange({ modifying: true, errorModify: null });
    // Dispatch event to the global scope
    if (this.config.storeId) {
      this.dispatch({
        type: ApiEvents.MODIFY_START,
        storeId: this.config.storeId,
        payload: null,
      });
    }
    // Make api request
    return apiRequest.pipe(
      // Handle success
      tap((r) => {
        // If a map function was provided, modify the data before executing anything else
        const resMapped = mapFn ? mapFn(r) : r;
        // Merge the api response with the payload
        const resMerged = mergePayloadWithApiResponse(data, resMapped);
        // If this is an entity store
        if (
          this.isEntityStore &&
          is.entityConfig(this.config) &&
          !!this.state?.data &&
          Array.isArray(this.state.data)
        ) {
          // TODO: Fix any
          const delta = mergeDedupeArrays(
            this.state.data as any,
            resMerged,
            this.config.uniqueId as keyof t
          );
          this.stateChange({ modifying: false, ...delta });
        } else {
          this.stateChange({ modifying: false, resMerged });
        }
        // Dispatch event to the global scope
        if (this.config.storeId) {
          this.dispatch({
            type: ApiEvents.MODIFY_SUCCESS,
            storeId: this.config.storeId,
            payload: r,
          });
        }
      }),
      // Handle error
      catchError((err) => {
        // Update state
        this.stateChange({ modifying: false, errorModify: err });
        if (this.config.storeId) {
          this.dispatch({
            type: ApiEvents.MODIFY_ERROR,
            storeId: this.config.storeId,
            payload: err,
          });
        }
        return throwError(err);
      })
    );
  }

  /**
   * Refresh the data in the store
   */
  public refresh(optionsOverride: State.Options = {}) {
    return this.get({ ...optionsOverride, refresh: true });
  }

  /**
   * Reset store to its initial state
   */
  public reset() {
    // Set autoload in progress flag to prevent active subscribers from immediately reloading store data when reset is performed
    this.autoloadInProgress = true;
    this.stateChange(
      this.isEntityStore ? this.getStateEntitySrc : this.getStateSrc
    );
    // Reset flag so that next sub will reload store data
    timer(1)
      .pipe(take(1))
      .subscribe(() => (this.autoloadInProgress = false));
  }

  /**
   * Perform updates to the base state object, shallow only
   * @param state
   */
  private stateChange(state: Partial<State.ApiState>) {
    this.state = Object.assign({}, this.state, state);
    this._state$.next(this.state);
  }
}

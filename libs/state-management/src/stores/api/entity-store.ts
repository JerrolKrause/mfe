import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { NtsState } from '../../state.models';
import { NtsApiStoreCreator } from './api-store-creator';

const configSrc: NtsState.ConfigEntity = {
  uniqueId: 'guid',
};

/**
 * Create an instance of an entity store
 */
export class NtsEntityStore<t> extends NtsApiStoreCreator<t> {
  public override state$!: Observable<NtsState.EntityApiState<t>>;

  /** Select an array of all the entities in the store. Does not include state. */
  public selectAll$ = this.state$.pipe(
    map((s) => s.data),
    distinctUntilChanged()
  );

  /** Modify the store data with the supplied callback function while preserving state information.
   *
   * Useful for mapping or filtering data in the store while still maintaining access to state.  */
  public stateSelect$ = (fn: NtsState.SelectEntities<t>) =>
    this.state$.pipe(
      map((state) => {
        // Ensure state.data is an array of objects
        const data = state.data ? fn([...(state.data as t[])]) : state.data;

        // Ensure b is an object and this.config.uniqueId is a valid key of b
        const entities = data
          ? (data as t[]).reduce<Record<string, t>>((a, b) => {
              const key = String(this.config.uniqueId); // Ensure key is a string
              if (typeof b === 'object' && b !== null && key in b) {
                a[key] = b as t;
              }
              return a;
            }, {})
          : {};

        return Object.assign({}, state, {
          data: data,
          entities: entities,
        }) as NtsState.EntityApiState<t>;
      })
    );

  /** Select a single entity from the store. Does not include state. */
  public selectOne$ = (uniqueId: string | number) =>
    this.state$.pipe(
      map((s) =>
        !!s.entities && !!s.entities[uniqueId]
          ? (s.entities[uniqueId] as t)
          : null
      ),
      distinctUntilChanged()
    );

  /**
   * Select a or modify subset of data from the store. Does not include state.
   * Pass a callback function that modifies the data in the store property
   */
  public select$ = (fn: NtsState.SelectEntities<t>) =>
    this.state$.pipe(
      map((s) => fn(s.data ? [...s.data] : s.data)),
      distinctUntilChanged()
    );

  constructor(
    http: HttpClient,
    protected override config: NtsState.ConfigEntity
  ) {
    super(http, Object.assign(configSrc, config), true);
  }
}

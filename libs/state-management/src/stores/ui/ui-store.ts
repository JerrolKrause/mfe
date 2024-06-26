import { BehaviorSubject, identity, Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { State } from '../../state.models';
import { isBrowser } from '../../utils/guards.util';
import { BaseStore } from '../base/base-store';

/**
 * Create an instance of a UI store
 */
export class UIStoreCreator<t> extends BaseStore {
  /** Observable of store state */
  public state$ = new BehaviorSubject<t>({ ...this.initialState });

  constructor(private initialState: t, private options?: State.UIStoreOptions) {
    super();
    // If persistID specified, rehydrate store state from localStorage
    if (isBrowser && this.options?.persistId) {
      const state = localStorage.getItem(this.options.persistId);
      if (state) {
        this.update(JSON.parse(state));
      }
    }
  }

  /**
   * Return data from the store
   * @param k
   * @param options
   * @returns
   **/
  public select$<Key extends keyof t>(
    key: Key,
    options?: State.UIStoreOptions
  ): Observable<t[Key]>;
  public select$<Payload>(
    k: (store: t) => Payload,
    options?: State.UIStoreOptions
  ): Observable<Payload>;
  public select$(
    k: State.Select<t> | State.Callback<t>,
    options?: State.UIStoreOptions
  ) {
    return this.state$.pipe(
      // Is this a function or string to pull out data from the model
      map((s) => (typeof k === 'function' ? k(s) : s[k])),
      // Disable distinctUntilChanged if requested in the options
      options?.disableDistinct ? identity : distinctUntilChanged()
    );
  }

  /**
   * Update data in the store
   * @param update
   * @returns An observable with the entire store state object. Completes immediately.
   */
  public update(value: Partial<t>): Observable<t>;
  public update(value: (s: t) => Partial<t>): Observable<t>;
  public update(value: unknown): Observable<t> {
    if (typeof value === 'function') {
      this.state$.pipe(take(1)).subscribe((state) => {
        const n = value(state);
        this.stateChange(n);
      });
    } else {
      this.stateChange(value as t);
    }
    // If persistId is specified, save all state changes to localStorage
    if (isBrowser && this.options?.persistId) {
      this.state$
        .pipe(take(1))
        .subscribe((state) =>
          localStorage.setItem(
            this.options?.persistId || '',
            JSON.stringify(state)
          )
        );
    }

    return this.state$.pipe(take(1));
  }

  /**
   * Reset store to it's initial state
   */
  public reset() {
    this.stateChange({ ...this.initialState });
  }

  /**
   * Update state of UI store
   * @param update
   */
  private stateChange(update: Partial<t>) {
    this.state$
      .pipe(take(1))
      .subscribe((state) => this.state$.next({ ...state, ...update }));
  }
}

/**
 * Create an instance of a UI store
 */
export const uIStoreCreator = <t>(
  initialState: t,
  options?: State.UIStoreOptions
) => new UIStoreCreator<t>(initialState, options);

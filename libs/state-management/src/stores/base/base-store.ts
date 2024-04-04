import { Subject } from 'rxjs';
import { State } from '../../state.models';

export class NtsBaseStore {
  static _events$ = new Subject<State.Action | State.ApiAction>();

  public events$ = NtsBaseStore._events$.pipe();

  public dispatch(a: State.Action | State.ApiAction) {
    NtsBaseStore._events$.next(a);
  }
}

/**
 * Base store instance shared by all stores
 * @returns
 */
export const ntsStore = new NtsBaseStore();

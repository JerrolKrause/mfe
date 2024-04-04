import { Subject } from 'rxjs';
import { State } from '../../state.models';

export class BaseStore {
  static _events$ = new Subject<State.Action | State.ApiAction>();

  public events$ = BaseStore._events$.pipe();

  public dispatch(a: State.Action | State.ApiAction) {
    BaseStore._events$.next(a);
  }
}

/**
 * Base store instance shared by all stores
 * @returns
 */
export const store = new BaseStore();

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { State } from '../../state.models';
import { NtsApiStoreCreator } from './api-store-creator';

export class NtsApiStore<t> extends NtsApiStoreCreator<t> {
  public override state$!: Observable<State.ApiState<t>>;
  /**
   * Select a smaller subset of data from the store
   */
  public select$ = this.state$.pipe(
    map((s) => s.data),
    distinctUntilChanged()
  );

  constructor(http: HttpClient, config: State.Config) {
    super(http, config, false);
  }
}

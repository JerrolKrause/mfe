import { Component, Input, ViewEncapsulation } from '@angular/core';
import { State } from '../../state.models';
import { NtsCombineEntityState } from '../../utils/combineEntityState.util';

@Component({
  selector: 'lib-api-state',
  templateUrl: './api-state.component.html',
  styleUrls: ['./api-state.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class NtsDomainStateComponent {
  /** Default domain state */
  @Input() set state(
    state:
      | State.ApiState
      | State.EntityApiState
      | (State.ApiState | State.EntityApiState | null | undefined)[]
      | undefined
      | null
  ) {
    this.stateSrc = NtsCombineEntityState(state);
  }

  /** Should the state component look the modify state instead of load state */
  @Input() modify = false;
  /** Should this component show loading state? */
  @Input() showLoading = true;
  /** Should this component show modifying state? */
  @Input() showModifying = true;
  /** Should this component show loading error */
  @Input() showErrorLoading = true;
  /** Should this component show modifying error? */
  @Input() showErrorModifying = true;

  /** Holds combined state of any number entity state objects */
  public stateSrc: State.ApiState | State.EntityApiState | undefined | null;
}

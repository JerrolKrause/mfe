import { Injectable } from '@angular/core';
import { agentId } from '../actions/quoting.actions';

@Injectable({ providedIn: 'root' })
export class QuotingService {
  public agentId: string | null = '';

  /**
   * On form submit, get mock agent ID
   * @param form
   */
  public submitForm(form: any) {
    if (form) {
      this.agentId = agentId;
    }
  }
}

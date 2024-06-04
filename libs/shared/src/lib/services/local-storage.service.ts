import { LoanCalculator } from '$quote-calculator';
import { StorageService } from '$state-management';
import { Injectable } from '@angular/core';
type LocalStorageKeys = 'token' | 'customerSelection';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService extends StorageService<LocalStorageKeys> {
  // Token
  public token$ = this.localStorage.getItem$('token');
  public set token(token: string | null) {
    this.localStorage.setItem('token', token);
  }
  public get token() {
    return this.localStorage.getItem('token');
  }

  // Customer Selection
  public customerSelection$ = this.localStorage.getItem$<LoanCalculator.Quote>(
    'customerSelection',
    { isJson: true }
  );
  public set customerSelection(customerSelection: LoanCalculator.Quote | null) {
    this.localStorage.setItem('customerSelection', customerSelection);
  }
  public get customerSelection() {
    return this.localStorage.getItem<LoanCalculator.Quote>(
      'customerSelection',
      { isJson: true }
    );
  }

  constructor() {
    super();
  }
}

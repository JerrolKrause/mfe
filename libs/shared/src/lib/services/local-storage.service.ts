import { LoanCalculator } from '$quote-calculator';
import { StorageService } from '$state-management';
import { Injectable } from '@angular/core';
type LocalStorageKeys = 'token' | 'quote';

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

  // Quote Updates
  public quote$ = this.localStorage.getItem$<LoanCalculator.Quote>('quote', {
    isJson: true,
  });
  public set quote(quote: LoanCalculator.Quote | null) {
    this.localStorage.setItem('quote', quote);
  }
  public get quote() {
    return this.localStorage.getItem<LoanCalculator.Quote>('quote', {
      isJson: true,
    });
  }

  constructor() {
    super();
  }
}

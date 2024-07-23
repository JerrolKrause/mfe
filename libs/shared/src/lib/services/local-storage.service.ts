import { LoanCalculator } from '$quote-calculator';
import { StorageService } from '$state-management';
import { Injectable } from '@angular/core';
type LocalStorageKeys = 'token' | 'quote' | 'quoteActive' | 'assets';

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

  // Token
  public quoteActive$ = this.localStorage.getItem$<LoanCalculator.Quote>(
    'quoteActive',
    {
      isJson: true,
    }
  );
  public set quoteActive(quoteActive: LoanCalculator.Quote | null) {
    this.localStorage.setItem('quoteActive', quoteActive);
  }
  public get quoteActive() {
    return this.localStorage.getItem<LoanCalculator.Quote>('quoteActive', {
      isJson: true,
    });
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

  // Shared assets. Stub for fake API storage
  public assets$ = this.localStorage.getItem$<any[]>('assets', {
    isJson: true,
  });
  public set assets(assets: any[] | null) {
    this.localStorage.setItem('assets', assets);
  }
  public get assets() {
    return this.localStorage.getItem<any[]>('assets', {
      isJson: true,
    });
  }

  constructor() {
    super();
  }
}

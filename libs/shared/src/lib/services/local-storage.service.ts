import { StorageService } from '$state-management';
import { Injectable } from '@angular/core';
type LocalStorageKeys = 'token';

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

  constructor() {
    super();
  }
}

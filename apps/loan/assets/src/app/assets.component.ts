import { AppStorageService } from '$shared';
import { Component } from '@angular/core';
import { map, tap } from 'rxjs';
import { AssetsService } from './shared/assets.services';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {
  public assetsCount$ = this.assetsSvc.assets$.pipe(
    tap((assets) => (this.storage.assets = assets)), // Write any changes to local storage for sharing with loan products
    map((assets) => assets.length)
  );

  constructor(
    private assetsSvc: AssetsService,
    private storage: AppStorageService
  ) {}
}

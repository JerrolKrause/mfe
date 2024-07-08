import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AssetsService } from './shared/assets.services';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {
  public assetsCount$ = this.assetsSvc.assets$.pipe(
    map((assets) => assets.length)
  );

  constructor(private assetsSvc: AssetsService) {}
}

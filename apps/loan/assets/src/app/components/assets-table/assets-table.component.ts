import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../shared/assets.services';

@Component({
  selector: 'app-assets-table',
  templateUrl: './assets-table.component.html',
  styleUrls: ['./assets-table.component.scss'],
})
export class AssetsTableComponent implements OnInit {
  constructor(public assetsSvc: AssetsService) {}

  ngOnInit(): void {}
}

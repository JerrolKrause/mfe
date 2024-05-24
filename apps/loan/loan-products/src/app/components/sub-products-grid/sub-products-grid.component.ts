import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sub-products-grid',
  templateUrl: './sub-products-grid.component.html',
  styleUrl: './sub-products-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubProductsGridComponent {}

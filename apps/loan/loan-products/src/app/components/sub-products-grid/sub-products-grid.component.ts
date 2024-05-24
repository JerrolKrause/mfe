import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoanProductModels } from '../../shared/models/loan-products.models';
@Component({
  selector: 'app-sub-products-grid',
  templateUrl: './sub-products-grid.component.html',
  styleUrl: './sub-products-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubProductsGridComponent {
  @Input() products?: LoanProductModels.SubProducts[] | null = [];
  @Input() colLength = 7;
}

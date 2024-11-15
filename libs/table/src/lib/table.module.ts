import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule as NgTable } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { QuickEditComponent } from './components/quick-edit/quick-edit.component';
import { TableComponent } from './components/table/table.component';
import { TableColumnCellDirective } from './directives/cell-body.directive';
import { TableColumnHeaderDirective } from './directives/cell-header.directive';
import { TableColumnDirective } from './directives/column.directive';
import { TableRowExpansionDirective } from './directives/row-expansion.directive';
import { DeepPropertyPipe } from './pipes/deep-property.pipe';
import { HeaderStylesPipe } from './pipes/header-styles.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { SlugPipe } from './pipes/slug.pipe';
import { TooltipPipe } from './pipes/tooltip.pipe';
const DEPS = [
  TableComponent,
  QuickEditComponent,
  TableColumnDirective,
  TableColumnCellDirective,
  TableColumnHeaderDirective,
  TableRowExpansionDirective,
];

@NgModule({
  declarations: [
    DEPS,
    SlugPipe,
    PhoneNumberPipe,
    HeaderStylesPipe,
    DeepPropertyPipe,
    TooltipPipe,
  ],
  imports: [
    CommonModule,
    NgTable,
    ReactiveFormsModule,
    OverlayPanelModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
  ],
  exports: [DEPS],
})
export class TableModule {}

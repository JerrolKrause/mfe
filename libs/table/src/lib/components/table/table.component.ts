import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  effect,
  ElementRef,
  EventEmitter,
  input,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
import { TableColumnDirective } from '../../directives/column.directive';
import { DeepPropertyPipe } from '../../pipes/deep-property.pipe';
import { OmfTable } from '../../table.models';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  providers: [DeepPropertyPipe],
})
export class TableComponent implements AfterViewInit {
  /** Rows */
  rows = input<{ [key: string]: any }[]>([]);
  /** Default sort order */
  sortOrder = input(1);
  /** Default sort field */
  sortField = input('');
  /** Columns */
  @Input() columns: OmfTable.Column[] = [];
  /** Custom header text */
  @Input() headerText?: string | null;
  /** Show the custom filter box */
  @Input() showFilter = false;
  /** Show table headers */
  @Input() showHeader = true;
  /** Custom global filter term */
  filterTerm = input<string | null | undefined>(null);
  /** Enable paginate and only display this many entries */
  paginateRows = input<number | null | undefined>(0);
  /** Shows a dropdown with how many results per page */
  @Input() rowsPerPageOptions: number[] = [];
  /** Responsive behavior */
  @Input() responsiveLayout: 'scroll' | 'stack' = 'scroll';
  /** Alternative to track changes via method */
  @Input() rowTrackBy: any = null; // Function | null
  /** Make table smaller */
  @Input() compact = false;
  /** Required input for ngPrime expander - expands all rows with the same key */
  @Input() dataKey: any = null; // String
  /** Allows expanded rows to be restricted to one at a time. Defaults to multiple, similar to the default behavior of p-table. */
  onlyAllowSingleExpandedRow = input(false);
  /** Highlight a row based on the dataKey */
  highlightRowKey = input<string | null | undefined>(null);
  /** If this cell has no data, show this character instead. Default nothing */
  public noDataCharacter = input<string | null | undefined>('');

  public shouldShowExpandRow = false;
  /** Track the expanded rows by row this.dataKey */
  protected expandedRows: Record<string, boolean> = {};
  /** Show/hide the paginator based on if paginateRows was defined */
  public paginator = false;

  /** Holds custom DOM templates passed from parent */
  public templates: Record<string, TableColumnDirective> = {};
  @ContentChildren(TableColumnDirective)
  set columnTemplates(val: QueryList<TableColumnDirective>) {
    const arr = val.toArray();
    if (arr.length) {
      arr.forEach((template) => (this.templates[template.field] = template));
    }
  }
  /** Reference to the p-table instance */
  @ViewChild('tt', { static: true }) table!: Table;
  /** Hold an unsorted instance of the rows. Also used to reset after sort */
  public rowsSrc$ = new BehaviorSubject([...(this.rows() ?? [])]);
  /** Keep an instance of the last sorted option. Used to unset sort */
  private sortLast: { field?: string; order?: number } = {};

  @ViewChildren('th') tableHeaders!: QueryList<ElementRef>;
  /** If quick edit is enabled, pass the updated row through this emitter */
  @Output() rowUpdated = new EventEmitter();

  constructor(private deepPropertyPipe: DeepPropertyPipe) {
    // Store an original copy of the array. Used to reset sorting. P-table mutates the array.
    effect(() => this.rowsSrc$.next([...(this.rows() ?? [])]));
    // Send the incoming filter term to the table filter
    effect(() => this.table.filterGlobal(this.filterTerm(), 'contains'));
    // Determine whether or not to display pagination logic
    effect(
      () =>
        (this.paginator =
          !!this.rows()?.length &&
          !!this.paginateRows() &&
          (this.rows()?.length ?? 0) > (this.paginateRows() ?? 0)
            ? !!this.paginateRows()
            : false)
    );
  }

  ngAfterViewInit(): void {
    // Determine whether or not to display the drop row icon
    this.updateShouldShowExpandRow();
  }

  /**
   * Reset/remove the sort order after user toggles through each state
   * Fixes issue where it's not possible to go back to the original sort order
   * @param sort
   */
  public onSort(sort: { field: string; order: number }) {
    if (this.sortLast.field === sort.field && sort.order === 1) {
      this.table.sortOrder = 0;
      this.table.sortField = '';
      this.sortLast = {};
      this.rowsSrc$.next([...(this.rows() ?? [])]); // Remove sorting
    } else {
      this.sortLast = { ...sort };
    }
  }

  /**
   * Make changes to global filter
   */
  public filterGlobalUpdate(e: any) {
    this.table.filterGlobal(e?.target?.value || null, 'contains');
  }

  /**
   * Handle toggling of the row expansion
   */
  public updateShouldShowExpandRow() {
    this.shouldShowExpandRow =
      !!this.templates['expansion'] &&
      !!this.templates['expansion'].templateExpansion &&
      !!this.dataKey;
  }

  /**
   * Handles row expansion behavior based on the onlyAllowSingleExpandedRow input.
   */
  public toggleRow(row: Record<string, any>) {
    if (this.onlyAllowSingleExpandedRow()) {
      this.singleExpandedRow(row);
    } else {
      this.multipleExpanededRows(row);
    }
  }

  /**
   * Only allow a single row to be expanded at a time.
   */
  private singleExpandedRow(row: Record<string, any>) {
    const newExpansionRow: Record<string, boolean> = {};
    if (!(row[this.dataKey] in this.expandedRows)) {
      newExpansionRow[row[this.dataKey]] = true;
    }
    this.expandedRows = newExpansionRow;
  }

  /**
   * Allow multiple rows to be expanded at a time. Similar to the default behavior of p-table.
   */
  private multipleExpanededRows(row: Record<string, any>) {
    this.expandedRows[row[this.dataKey]] =
      !this.expandedRows[row[this.dataKey]];
  }

  /**
   * Handles changes to a specific field within a row, updating the row's nested value
   * based on the provided field path, and emits the updated row.
   *
   * @param row - The row object to update, represented as a record of key-value pairs.
   * @param field - A dot-separated string path specifying the nested property to update
   *                (e.g., 'address.city' or 'contact.email').
   * @param value - The new value to set at the specified field path within the row.
   */
  public rowValueChanged(
    row: Record<string, unknown>,
    field: string,
    value: unknown
  ) {
    this.rowUpdated.emit(this.updateNestedValue(row, field, value));
  }

  /**
   * Updates the value of a deeply nested property in a copy of an object based on a dot-separated path.
   * Creates intermediate objects if they don't exist in the path.
   * Returns a new instance of the object with the updated value.
   *
   * @param obj - The original object to update (will not be mutated).
   * @param path - A dot-separated string specifying the nested property path (e.g., 'property1.property2.property3').
   * @param value - The value to set at the specified path.
   * @returns A new instance of the object with the updated value.
   */
  private updateNestedValue<T extends Record<string, any>>(
    obj: T,
    path: string,
    value: any
  ): T {
    // Create a deep copy of the original object using structuredClone if available, otherwise JSON.parse/JSON.stringify
    const newObj =
      typeof structuredClone === 'function'
        ? structuredClone(obj)
        : JSON.parse(JSON.stringify(obj));

    const keys = path.split('.');
    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      // Skip prototype pollution keys
      if (key === '__proto__' || key === 'constructor') {
        continue;
      }
      // If the key doesn't exist, create an empty object
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    // Set the value at the specified path
    const lastKey = keys[keys.length - 1];
    if (lastKey !== '__proto__' && lastKey !== 'constructor') {
      current[lastKey] = value;
    }

    return newObj;
  }

  /**
   * When a user clicks on a TD, extract the deep property and copy to clipboard
   * @param col
   * @param rowData
   */
  onCopyClick(col: any, rowData: any): void {
    if (col.copyToClipboard) {
      const valueToCopy = this.deepPropertyPipe.transform(rowData, col.field); // Apply the deepProperty pipe manually
      this.copyToClipboard(valueToCopy);
    }
  }

  /**
   * Copies a given text to the clipboard.
   * @param text - The text to be copied to the clipboard.
   * @returns A promise that resolves when the text is copied successfully.
   */
  public copyToClipboard(text: string): Promise<void> {
    if (
      document.hasFocus() &&
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      return navigator.clipboard.writeText(text).then().catch();
    } else {
      // Fallback for older browsers
      return new Promise<void>((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Prevent scrolling to the bottom of the page
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          document.execCommand('copy');
          console.log('Text copied to clipboard successfully.');
          resolve();
        } catch (err) {
          console.error('Failed to copy text to clipboard:', err);
          reject(err);
        } finally {
          document.body.removeChild(textarea);
        }
      });
    }
  }
}

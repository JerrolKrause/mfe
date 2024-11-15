// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OmfTable {
  export type ColumnType =
    | 'text'
    | 'email'
    | 'phoneNumber'
    | 'date'
    | 'dateTime'
    | 'currency'
    | 'number'
    | 'limited';
  export interface Column<t = any> {
    field: keyof t | string;
    header: string | null;
    /** Type of data to manage formatting. Default text */
    type?: ColumnType;
    /** Arguments to pass to the formatting pipes */
    typeArgs?: string;
    sortable?: boolean;
    width?: string;
    style?: Record<string, string>;
    /** Can this cell be quick edited by double clicking? Data will be emitted up via the rowUpdated event emitter */
    quickEdit?: boolean;
    /** Text alignment of the TD, does not affect table header (TH) */
    tdAlign?: 'left' | 'right' | 'center';
    /** Display a tooltip on the table cell, accepts a static string or a callback function that receives the row data */
    tooltip?: null | string | ((row?: any | null) => string);
    tooltipPosition?: 'right' | 'left' | 'top' | 'bottom';
    /** If true, clicking on the table cell will copy the contents to the clipboard */
    copyToClipboard?: boolean;
  }
}

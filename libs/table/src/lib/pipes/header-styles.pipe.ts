import { Pipe, PipeTransform } from '@angular/core';
import { OmfTable } from '../table.models';

/**
 * Create header styles by merging the width and style properties on the column
 */
@Pipe({
  name: 'headerStyles',
})
export class HeaderStylesPipe implements PipeTransform {
  transform(col: OmfTable.Column): Record<string, string> {
    return {
      width: col?.width || '',
      ...col.style,
    };
  }
}

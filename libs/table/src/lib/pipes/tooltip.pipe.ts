import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert a string to a slug by making lowercase, remove special characters, replace spaces with hyphens
 * IE: "Hello !23 World" => "hello-23-world"
 * USAGE: {{ value | slug }}
 */
@Pipe({
  name: 'tooltip',
})
export class TooltipPipe implements PipeTransform {
  transform(
    tooltip: null | string | ((row?: { [key: string]: any } | null) => string),
    row: { [key: string]: any }
  ) {
    if (typeof tooltip === 'string') {
      return tooltip;
    } else if (typeof tooltip === 'function' && row) {
      return tooltip(row);
    }
    return '';
  }
}

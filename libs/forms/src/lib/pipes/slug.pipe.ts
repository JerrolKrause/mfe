import { Pipe, PipeTransform } from '@angular/core';
import { slugCreate } from '../utils';

/**
 * Convert a string to a slug by making lowercase, remove special characters, replace spaces with hyphens
 * IE: "Hello !23 World" => "hello-23-world"
 * USAGE: {{ value | slug }}
 */
@Pipe({
  name: 'slug',
})
export class SlugPipe implements PipeTransform {
  transform(value: unknown): string {
    return slugCreate(value);
  }
}

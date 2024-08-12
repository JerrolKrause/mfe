import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrl: './no-content.component.scss',
})
export class NoContentComponent {
  public title$ = this.route.url.pipe(
    map((segments) => {
      const lastSegment = segments[segments.length - 1]?.path;
      return this.toTitleCase(lastSegment ?? 'Coming Soon');
    })
  );

  constructor(private route: ActivatedRoute) {}
  private toTitleCase(str: string): string {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

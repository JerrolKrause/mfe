import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'lib-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFieldComponent implements OnInit {
  /** Term entered by the user */
  @Input() filterTerm: string | null = null;
  /** Character size of input box */
  @Input() size = 30;
  /** Should the filter box shrink down to fit nicely when used inline */
  @Input() small = false;
  @Output() filterTermChange: EventEmitter<string | null> = new EventEmitter();

  @Input() placeholder = 'Enter filter term...';

  constructor() {}

  ngOnInit() {}

  onChanges(filterTerm: string | null) {
    this.filterTerm = filterTerm;
    this.filterTermChange.emit(filterTerm);
  }
}

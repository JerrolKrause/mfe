import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CheckboxChangeEvent } from 'primeng/checkbox';
@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnChanges {
  @Input() control?: boolean;
  @Input() label = '';
  @Input() binary = true;
  @Output() propSelected = new EventEmitter<CheckboxChangeEvent>();
  public value: any;

  ngOnChanges() {
    // Load default value if one is found in the form control
    if (this.control) {
      this.value = this.control;
    }
  }

  /**
   * When a user checks a value from the checkbox
   * @param event
   */
  public onSelect(event: CheckboxChangeEvent) {
    this.propSelected.emit(event);
  }
}

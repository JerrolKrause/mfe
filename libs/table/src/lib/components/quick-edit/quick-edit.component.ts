import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  HostBinding,
  input,
  OnDestroy,
  Output,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { OverlayPanel } from 'primeng/overlaypanel';
import { OmfTable } from '../../table.models';

/**
 * Provides quick edit capability that shows the supplied
 * @example
 * <td
        libQuickEdit
        [value]="asset.mileage"
        inputType="currency"
        (valueChanged)="saveChange($event)"
      >
        <!-- The value as displayed to the user. Supports pipe formatting and HTML -->
        {{ asset.mileage | currency : 'USD' : 'symbol' : '1.0-0' }}
      </td>
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[libQuickEdit]',
  templateUrl: './quick-edit.component.html',
  styleUrls: ['./quick-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickEditComponent implements OnDestroy {
  /** Unformatted value for displaying in the form field */
  public value = input<unknown>();
  /** Text label of the field */
  public label = input<null | string>(null);
  /** Determine if quick edit capability is enabled or disabled */
  public enabled = input(false);
  /** Set a css class on the parent TD which enables the CSS visibility */
  // @HostBinding('class.quick-edit-enabled') quickEditEnabled = this.enabled();
  @HostBinding('class.quick-edit-enabled')
  get quickEditEnabled() {
    return this.enabled();
  }
  /** Form field type. Available options are text, number, and currency */
  public inputType = input<OmfTable.ColumnType>('text');
  /** When the form field is displayed, autoselect the contents */
  public autoSelect = input(true);
  /** Determine click trigger event to pop the overlay */
  public triggerEvent = input<'click' | 'dblclick'>('dblclick');
  /** The title attribute text that appears when the user mouse hovers over the editable area */
  public titleText = input('Double click to edit');
  /** Is the user currently editing the field. Used to load/unload the field from the DOM to allow for auto select */
  public isEditing = signal(false);
  // Create form control. Computed from input value to add support for value changes
  public formControl = new FormControl(this.value());
  // Get a reference to the OverlayPanel using @ViewChild
  @ViewChild('op') overlayPanel!: OverlayPanel;
  // Get a reference to the active input
  @ViewChild('input', { static: false }) input!: InputNumber;
  /**
   * Title for the host container (added via HostBinding).
   * Dynamically generated or statically assigned based on the component state.
   * Sets a default title of "Double Click To Edit"
   */
  @HostBinding('attr.title')
  get title(): string {
    return this.enabled() ? this.titleText() : '';
  }
  /** When the value is changed via clicking on save or hitting enter */
  @Output() valueChanged = new EventEmitter();
  /** Store listener for cleanup */
  private listenerCleanup: (() => void) | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // When the input value changes, update the form control
    effect(() => this.formControl.patchValue(this.value()));
    // Enable/disable quick edit functionality
    effect(() => {
      if (this.enabled()) {
        // Dynamically bind the event using Renderer2
        // Allows the click event to be configurable via triggerEvent input
        // Store listener for memory cleanup on destroy
        this.listenerCleanup = this.renderer.listen(
          this.el.nativeElement,
          this.triggerEvent(),
          (event: Event) => this.overlayPanel.toggle(event)
        );
      } else {
        this.removeListener(); // Clean up any previous listeners
      }
    });
  }

  /**
   * When the panel is shown
   */
  public onShow() {
    this.isEditing.set(true);
    // Autoselect the text in the input.
    // Settimout required since element is not static or always present in the DOM.
    // Setting static to false doesn't seem to fix this
    setTimeout(() => this.input.input.nativeElement.select());
  }

  /**
   * When the panel is hidden
   */
  public onHide() {
    this.isEditing.set(false);
    // Reset the form value on close. This accounts for the scenario where a user opens, changes the value but does not saves
    this.formControl.patchValue(this.value());
  }

  /**
   * When a keyboard event is received from the child form field
   * @param event
   */
  public keyupEvent(event: KeyboardEvent) {
    // If the keypress is enter, send the data to the parent
    if (event.key === 'Enter') {
      this.updateValue(this.formControl.value);
    }
  }

  /**
   * Emit value to parent on change
   */
  public updateValue(value: any) {
    this.valueChanged.emit(value);
    // Close panel after submission
    this.overlayPanel.hide();
  }

  private removeListener() {
    // Call the cleanup function to remove the event listener
    if (this.listenerCleanup) {
      this.listenerCleanup();
      this.listenerCleanup = null;
    }
  }

  ngOnDestroy(): void {
    this.removeListener();
  }
}

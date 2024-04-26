import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { LoanCalculator } from '../quote-calculator.models';

@Component({
  selector: 'lib-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class QuoteFormComponent implements OnInit, OnChanges, OnDestroy {
  /** Disable Form */
  @Input() disabled = false;
  /** Initial/default values to load the form with */
  @Input() formDefaults?: Partial<LoanCalculator.Quote> | null = null;
  /** Controls the debounce time in milliseconds, default is 100ms */
  @Input() debounceForm = 250;
  /** Should the form emit its values after load, default true */
  @Input() emitOnload = true;

  /** Quote Form */
  public quoteFrm = this.fb.group({
    loanAmount: [6000],
    loanDuration: [48],
    monthlyIncome: [2000],
    creditScore: [650],
    apr: [21],
    collateral: ['Yes'],
  });

  /** When the form is changed, send the form values to the parent */
  @Output() quoteFormChanged = new EventEmitter<LoanCalculator.Quote>();

  // Unsub on destroy
  private sub: Subscription;

  constructor(private fb: FormBuilder) {
    // On form changes, emit to parent
    this.sub = this.quoteFrm.valueChanges
      .pipe(debounceTime(250))
      .subscribe((quote) => this.quoteFormChanged.emit(quote));
  }

  ngOnInit(): void {
    // If form defaults supplied, update onload form data
    if (this.formDefaults) {
      this.quoteFrm.patchValue({
        ...this.quoteFrm.value, // Keep original values to allow partial updates
        ...this.formDefaults,
      });
    }
    // If emit on load set, send updated form values back to parent
    if (this.emitOnload) {
      this.quoteFormChanged.emit(this.quoteFrm.value);
    }
    this.disabled ? this.quoteFrm.disable() : this.quoteFrm.enable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If default form values change
    if (changes['formDefaults'] && this.formDefaults) {
      this.quoteFrm.patchValue(this.formDefaults);
    }
    if (changes['disabled']) {
      this.disabled ? this.quoteFrm.disable() : this.quoteFrm.enable();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

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
import { BehaviorSubject, Subscription, debounceTime, take } from 'rxjs';
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
  @Input() ranges?: Partial<LoanCalculator.Ranges> | null = {
    cashOut: {
      min: 1000,
      max: 15000,
    },
    loanAmount: {
      min: 1000,
      max: 15000,
    },
    loanDuration: {
      min: 24,
      max: 60,
    },
    monthlyPayment: {
      min: 50,
      max: 1000,
    },
  };
  /** Controls the debounce time in milliseconds, default is 100ms */
  @Input() debounceForm = 250;
  /** Should the form emit its values after load, default true */
  @Input() emitOnload = true;

  public ranges$ = new BehaviorSubject(this.ranges);

  /** Quote Form */
  public quoteFrm = this.fb.group({
    cashOut: 2000,
    loanAmount: [6000],
    loanDuration: [48],
    monthlyIncome: [2000],
    creditScore: [650],
    apr: [21],
    collateral: ['Yes'],
    monthlyPayment: 200,
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
    if (changes['ranges'] && this.ranges) {
      this.ranges$.pipe(take(1)).subscribe((rangesOld) =>
        this.ranges$.next({
          cashOut: { ...rangesOld?.cashOut, ...this.ranges?.cashOut },
          loanAmount: { ...rangesOld?.loanAmount, ...this.ranges?.loanAmount },
          loanDuration: {
            ...rangesOld?.loanDuration,
            ...this.ranges?.loanDuration,
          },
          monthlyPayment: {
            ...rangesOld?.monthlyPayment,
            ...this.ranges?.monthlyPayment,
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

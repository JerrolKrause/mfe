import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanReasonComponent } from './loan-reason.component';

describe('LoanReasonComponent', () => {
  let component: LoanReasonComponent;
  let fixture: ComponentFixture<LoanReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanReasonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

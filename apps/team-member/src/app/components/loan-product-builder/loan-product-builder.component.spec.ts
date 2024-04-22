import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanProductBuilderComponent } from './loan-product-builder.component';

describe('LoanProductBuilderComponent', () => {
  let component: LoanProductBuilderComponent;
  let fixture: ComponentFixture<LoanProductBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanProductBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanProductBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

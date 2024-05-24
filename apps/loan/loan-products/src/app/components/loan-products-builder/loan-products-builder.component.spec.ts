import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanProductsBuilderComponent } from './loan-products-builder.component';

describe('LoanProductsBuilderComponent', () => {
  let component: LoanProductsBuilderComponent;
  let fixture: ComponentFixture<LoanProductsBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanProductsBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanProductsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

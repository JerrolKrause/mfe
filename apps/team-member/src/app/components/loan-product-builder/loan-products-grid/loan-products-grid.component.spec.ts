import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanProductsGridComponent } from './loan-products-grid.component';

describe('LoanProductsGridComponent', () => {
  let component: LoanProductsGridComponent;
  let fixture: ComponentFixture<LoanProductsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanProductsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

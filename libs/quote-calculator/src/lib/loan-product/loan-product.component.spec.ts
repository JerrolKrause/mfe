import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanProductComponent } from './loan-product.component';

describe('LoanProductComponent', () => {
  let component: LoanProductComponent;
  let fixture: ComponentFixture<LoanProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

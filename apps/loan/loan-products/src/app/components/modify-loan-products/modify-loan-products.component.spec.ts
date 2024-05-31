import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyLoanProductsComponent } from './modify-loan-products.component';

describe('ModifyLoanProductsComponent', () => {
  let component: ModifyLoanProductsComponent;
  let fixture: ComponentFixture<ModifyLoanProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyLoanProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyLoanProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditProductsBuilderComponent } from './credit-products-builder.component';

describe('CreditProductsBuilderComponent', () => {
  let component: CreditProductsBuilderComponent;
  let fixture: ComponentFixture<CreditProductsBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditProductsBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditProductsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

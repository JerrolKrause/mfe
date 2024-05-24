import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NonCreditProductsBuilderComponent } from './non-credit-products-builder.component';

describe('NonCreditProductsBuilderComponent', () => {
  let component: NonCreditProductsBuilderComponent;
  let fixture: ComponentFixture<NonCreditProductsBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonCreditProductsBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NonCreditProductsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

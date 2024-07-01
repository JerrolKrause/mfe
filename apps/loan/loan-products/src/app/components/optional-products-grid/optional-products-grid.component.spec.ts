import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionalProductsGridComponent } from './optional-products-grid.component';

describe('OptionalProductsGridComponent', () => {
  let component: OptionalProductsGridComponent;
  let fixture: ComponentFixture<OptionalProductsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionalProductsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionalProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

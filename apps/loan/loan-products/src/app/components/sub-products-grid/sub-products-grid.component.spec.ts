import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubProductsGridComponent } from './sub-products-grid.component';

describe('SubProductsGridComponent', () => {
  let component: SubProductsGridComponent;
  let fixture: ComponentFixture<SubProductsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubProductsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

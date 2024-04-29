import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerControlsComponent } from './customer-controls.component';

describe('CustomerControlsComponent', () => {
  let component: CustomerControlsComponent;
  let fixture: ComponentFixture<CustomerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

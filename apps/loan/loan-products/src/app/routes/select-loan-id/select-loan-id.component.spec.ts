import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectLoanIdComponent } from './select-loan-id.component';

describe('SelectLoanIdComponent', () => {
  let component: SelectLoanIdComponent;
  let fixture: ComponentFixture<SelectLoanIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectLoanIdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLoanIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

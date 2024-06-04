import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectLoanTaskComponent } from './select-loan-task.component';

describe('SelectLoanTaskComponent', () => {
  let component: SelectLoanTaskComponent;
  let fixture: ComponentFixture<SelectLoanTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectLoanTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLoanTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

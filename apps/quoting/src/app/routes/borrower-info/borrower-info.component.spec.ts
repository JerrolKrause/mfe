import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowerInfoComponent } from './borrower-info.component';

describe('BorrowerInfoComponent', () => {
  let component: BorrowerInfoComponent;
  let fixture: ComponentFixture<BorrowerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowerInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsAdditionComponent } from './funds-addition.component';

describe('FundsAdditionComponent', () => {
  let component: FundsAdditionComponent;
  let fixture: ComponentFixture<FundsAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundsAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundsAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

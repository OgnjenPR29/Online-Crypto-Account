import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCurrencyComponent } from './buy-currency.component';

describe('BuyCurrencyComponent', () => {
  let component: BuyCurrencyComponent;
  let fixture: ComponentFixture<BuyCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

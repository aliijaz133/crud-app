import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletChartComponent } from './wallet-chart.component';

describe('WalletChartComponent', () => {
  let component: WalletChartComponent;
  let fixture: ComponentFixture<WalletChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletChartComponent]
    });
    fixture = TestBed.createComponent(WalletChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

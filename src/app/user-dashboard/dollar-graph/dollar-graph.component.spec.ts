import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DollarGraphComponent } from './dollar-graph.component';

describe('DollarGraphComponent', () => {
  let component: DollarGraphComponent;
  let fixture: ComponentFixture<DollarGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DollarGraphComponent]
    });
    fixture = TestBed.createComponent(DollarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

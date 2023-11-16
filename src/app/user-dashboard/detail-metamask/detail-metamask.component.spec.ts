import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMetamaskComponent } from './detail-metamask.component';

describe('DetailMetamaskComponent', () => {
  let component: DetailMetamaskComponent;
  let fixture: ComponentFixture<DetailMetamaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMetamaskComponent]
    });
    fixture = TestBed.createComponent(DetailMetamaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

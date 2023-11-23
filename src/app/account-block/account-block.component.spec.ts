import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBlockComponent } from './account-block.component';

describe('AccountBlockComponent', () => {
  let component: AccountBlockComponent;
  let fixture: ComponentFixture<AccountBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountBlockComponent]
    });
    fixture = TestBed.createComponent(AccountBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

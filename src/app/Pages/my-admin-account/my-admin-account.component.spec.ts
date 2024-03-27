import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdminAccountComponent } from './my-admin-account.component';

describe('MyAdminAccountComponent', () => {
  let component: MyAdminAccountComponent;
  let fixture: ComponentFixture<MyAdminAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAdminAccountComponent]
    });
    fixture = TestBed.createComponent(MyAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

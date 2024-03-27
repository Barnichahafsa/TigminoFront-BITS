import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobUserComponent } from './add-mob-user.component';

describe('AddMobUserComponent', () => {
  let component: AddMobUserComponent;
  let fixture: ComponentFixture<AddMobUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMobUserComponent]
    });
    fixture = TestBed.createComponent(AddMobUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

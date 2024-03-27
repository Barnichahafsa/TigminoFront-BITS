import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebAdminComponent } from './add-web-admin.component';

describe('AddWebAdminComponent', () => {
  let component: AddWebAdminComponent;
  let fixture: ComponentFixture<AddWebAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWebAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWebAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

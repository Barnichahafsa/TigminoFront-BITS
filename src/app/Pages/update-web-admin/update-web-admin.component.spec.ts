import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWebAdminComponent } from './update-web-admin.component';

describe('UpdateWebAdminComponent', () => {
  let component: UpdateWebAdminComponent;
  let fixture: ComponentFixture<UpdateWebAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWebAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWebAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

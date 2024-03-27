import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdminListComponent } from './web-admin-list.component';

describe('WebAdminListComponent', () => {
  let component: WebAdminListComponent;
  let fixture: ComponentFixture<WebAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebAdminListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WebAdminService } from './web-admin.service';

describe('WebAdminService', () => {
  let service: WebAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

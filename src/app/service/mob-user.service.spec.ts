import { TestBed } from '@angular/core/testing';

import { MobUserService } from './mob-user.service';

describe('MobUserService', () => {
  let service: MobUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

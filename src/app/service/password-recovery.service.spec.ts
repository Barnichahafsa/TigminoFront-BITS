import { TestBed } from '@angular/core/testing';

import { PasswordRecoveryPasswordService } from './password-recovery.service';

describe('PasswordRecoveryPasswordService', () => {
  let service: PasswordRecoveryPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordRecoveryPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

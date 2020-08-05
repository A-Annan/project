import { TestBed, inject } from '@angular/core/testing';

import { ForbiddenValidatorDirectiveService } from './forbidden-validator-directive.service';

describe('ForbiddenValidatorDirectiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForbiddenValidatorDirectiveService]
    });
  });

  it('should be created', inject([ForbiddenValidatorDirectiveService], (service: ForbiddenValidatorDirectiveService) => {
    expect(service).toBeTruthy();
  }));
});

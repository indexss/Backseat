import { TestBed } from '@angular/core/testing';

import { CheckExistService } from './check-exist.service';

describe('CheckExistService', () => {
  let service: CheckExistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckExistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

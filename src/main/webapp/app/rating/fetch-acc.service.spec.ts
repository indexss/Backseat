import { TestBed } from '@angular/core/testing';

import { FetchAccService } from './fetch-acc.service';

describe('FetchAccService', () => {
  let service: FetchAccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

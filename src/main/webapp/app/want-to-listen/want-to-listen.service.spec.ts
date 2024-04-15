import { TestBed } from '@angular/core/testing';

import { WantToListenService } from './want-to-listen.service';

describe('WantToListenService', () => {
  let service: WantToListenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WantToListenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

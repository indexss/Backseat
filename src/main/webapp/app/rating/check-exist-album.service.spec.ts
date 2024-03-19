import { TestBed } from '@angular/core/testing';

import { CheckExistAlbumService } from './check-exist-album.service';

describe('CheckExistAlbumService', () => {
  let service: CheckExistAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckExistAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

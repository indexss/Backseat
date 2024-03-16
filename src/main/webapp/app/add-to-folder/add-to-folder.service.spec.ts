import { TestBed } from '@angular/core/testing';

import { AddToFolderService } from './add-to-folder.service';

describe('AddToFolderService', () => {
  let service: AddToFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

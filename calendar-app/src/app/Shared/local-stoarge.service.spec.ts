import { TestBed } from '@angular/core/testing';

import { LocalStoargeService } from './local-stoarge.service';

describe('LocalStoargeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStoargeService = TestBed.get(LocalStoargeService);
    expect(service).toBeTruthy();
  });
});

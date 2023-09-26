import { TestBed } from '@angular/core/testing';

import { PrevnextService } from './prevnext.service';

describe('PrevnextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrevnextService = TestBed.get(PrevnextService);
    expect(service).toBeTruthy();
  });
});

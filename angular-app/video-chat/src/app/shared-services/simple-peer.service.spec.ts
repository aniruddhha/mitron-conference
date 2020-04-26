import { TestBed } from '@angular/core/testing';

import { SimplePeerService } from './simple-peer.service';

describe('SimplePeerService', () => {
  let service: SimplePeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimplePeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

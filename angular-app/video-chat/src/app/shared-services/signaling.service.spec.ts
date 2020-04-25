import { TestBed } from '@angular/core/testing';

import { SignalingService } from './signaling.service';

describe('SignalingService', () => {
  let service: SignalingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

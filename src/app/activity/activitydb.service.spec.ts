import { TestBed } from '@angular/core/testing';

import { ActivitydbService } from './activitydb.service';

describe('ActivitydbService', () => {
  let service: ActivitydbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitydbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

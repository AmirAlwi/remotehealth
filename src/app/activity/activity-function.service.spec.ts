import { TestBed } from '@angular/core/testing';

import { ActivityFunctionService } from './activity-function.service';

describe('ActivityFunctionService', () => {
  let service: ActivityFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

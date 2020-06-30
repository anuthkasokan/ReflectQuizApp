import { TestBed } from '@angular/core/testing';

import { CulturalobservationService } from './culturalobservation.service';

describe('CulturalobservationService', () => {
  let service: CulturalobservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CulturalobservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

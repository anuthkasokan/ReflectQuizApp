import { TestBed } from '@angular/core/testing';

import { LearningmythsService } from './learningmyths.service';

describe('LearningmythsService', () => {
  let service: LearningmythsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningmythsService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});

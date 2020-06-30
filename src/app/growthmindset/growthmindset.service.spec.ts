import { TestBed } from '@angular/core/testing';

import { GrowthmindsetService } from './growthmindset.service';

describe('GrowthmindsetService', () => {
  let service: GrowthmindsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowthmindsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

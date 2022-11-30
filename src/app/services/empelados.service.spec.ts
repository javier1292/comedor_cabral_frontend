import { TestBed } from '@angular/core/testing';

import { EmpeladosService } from './empelados.service';

describe('EmpeladosService', () => {
  let service: EmpeladosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpeladosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegistrosService } from './registros.service';

describe('RegistrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrosService = TestBed.get(RegistrosService);
    expect(service).toBeTruthy();
  });
});

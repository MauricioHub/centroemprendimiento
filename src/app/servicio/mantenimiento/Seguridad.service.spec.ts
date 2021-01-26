/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeguridadService } from './Seguridad.service';

describe('Service: Seguridad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeguridadService]
    });
  });

  it('should ...', inject([SeguridadService], (service: SeguridadService) => {
    expect(service).toBeTruthy();
  }));
});

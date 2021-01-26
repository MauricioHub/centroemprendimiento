/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmprendimientoService } from './Emprendimiento.service';

describe('Service: Emprendimiento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmprendimientoService]
    });
  });

  it('should ...', inject([EmprendimientoService], (service: EmprendimientoService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgramaService } from './Programa.service';

describe('Service: Programa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramaService]
    });
  });

  it('should ...', inject([ProgramaService], (service: ProgramaService) => {
    expect(service).toBeTruthy();
  }));
});

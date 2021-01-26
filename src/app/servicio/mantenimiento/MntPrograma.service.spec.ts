/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MntProgramaService } from './MntPrograma.service';

describe('Service: MntPrograma', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MntProgramaService]
    });
  });

  it('should ...', inject([MntProgramaService], (service: MntProgramaService) => {
    expect(service).toBeTruthy();
  }));
});

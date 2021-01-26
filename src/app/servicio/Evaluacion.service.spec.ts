/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EvaluacionService } from './Evaluacion.service';

describe('Service: Evaluacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluacionService]
    });
  });

  it('should ...', inject([EvaluacionService], (service: EvaluacionService) => {
    expect(service).toBeTruthy();
  }));
});

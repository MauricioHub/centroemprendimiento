/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RubricaService } from './Rubrica.service';

describe('Service: Rubrica', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RubricaService]
    });
  });

  it('should ...', inject([RubricaService], (service: RubricaService) => {
    expect(service).toBeTruthy();
  }));
});

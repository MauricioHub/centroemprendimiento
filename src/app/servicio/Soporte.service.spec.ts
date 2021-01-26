import { TestBed, async, inject } from '@angular/core/testing';
import { SoporteService } from './Soporte.service';

describe('Service: Programa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoporteService]
    });
  });

  it('should ...', inject([SoporteService], (service: SoporteService) => {
    expect(service).toBeTruthy();
  }));
});
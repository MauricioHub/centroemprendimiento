/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmprendedorService } from './Emprendedor.service';

describe('Service: Emprendedor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmprendedorService]
    });
  });

  it('should ...', inject([EmprendedorService], (service: EmprendedorService) => {
    expect(service).toBeTruthy();
  }));
});

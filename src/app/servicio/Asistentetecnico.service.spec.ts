/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsistentetecnicoService } from './Asistentetecnico.service';

describe('Service: Asistentetecnico', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsistentetecnicoService]
    });
  });

  it('should ...', inject([AsistentetecnicoService], (service: AsistentetecnicoService) => {
    expect(service).toBeTruthy();
  }));
});

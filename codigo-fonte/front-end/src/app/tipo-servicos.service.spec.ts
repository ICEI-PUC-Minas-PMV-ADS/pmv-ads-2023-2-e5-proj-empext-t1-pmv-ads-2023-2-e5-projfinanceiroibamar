import { TestBed } from '@angular/core/testing';

import { TipoServicosService } from './tipo-servicos.service';

describe('TipoServicosService', () => {
  let service: TipoServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

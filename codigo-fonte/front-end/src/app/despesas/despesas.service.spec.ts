import { TestBed } from '@angular/core/testing';

import { DespesaService } from 'src/app/despesas/despesas.service';

describe('DespesasService', () => {
  let service: DespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

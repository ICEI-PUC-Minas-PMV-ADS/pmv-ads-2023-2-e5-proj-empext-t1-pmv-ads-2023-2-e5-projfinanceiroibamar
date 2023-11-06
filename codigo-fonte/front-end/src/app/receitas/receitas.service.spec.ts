import { TestBed } from '@angular/core/testing';

import { ReceitaService } from './receitas.service';

describe('ReceitasService', () => {
  let service: ReceitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

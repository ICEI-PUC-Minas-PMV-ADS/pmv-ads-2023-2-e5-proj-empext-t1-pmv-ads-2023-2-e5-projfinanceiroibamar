import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarFornecedoresComponent } from './gerenciar-fornecedores.component';

describe('GerenciarFornecedoresComponent', () => {
  let component: GerenciarFornecedoresComponent;
  let fixture: ComponentFixture<GerenciarFornecedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarFornecedoresComponent]
    });
    fixture = TestBed.createComponent(GerenciarFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

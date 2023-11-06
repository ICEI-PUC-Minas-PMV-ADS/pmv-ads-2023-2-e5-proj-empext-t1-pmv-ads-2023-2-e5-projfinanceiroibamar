import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarDespesasComponent } from './gerenciar-despesas.component';

describe('GerenciarDespesasComponent', () => {
  let component: GerenciarDespesasComponent;
  let fixture: ComponentFixture<GerenciarDespesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarDespesasComponent]
    });
    fixture = TestBed.createComponent(GerenciarDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

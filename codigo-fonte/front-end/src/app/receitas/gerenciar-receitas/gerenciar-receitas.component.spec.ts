import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarReceitasComponent } from './gerenciar-receitas.component';

describe('GerenciarReceitasComponent', () => {
  let component: GerenciarReceitasComponent;
  let fixture: ComponentFixture<GerenciarReceitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarReceitasComponent]
    });
    fixture = TestBed.createComponent(GerenciarReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

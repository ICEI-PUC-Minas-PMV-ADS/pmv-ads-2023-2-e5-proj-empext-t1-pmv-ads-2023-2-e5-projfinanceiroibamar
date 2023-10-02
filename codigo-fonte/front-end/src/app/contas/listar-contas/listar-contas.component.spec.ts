import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContasComponent } from './listar-contas.component';

describe('ListarContasComponent', () => {
  let component: ListarContasComponent;
  let fixture: ComponentFixture<ListarContasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarContasComponent]
    });
    fixture = TestBed.createComponent(ListarContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

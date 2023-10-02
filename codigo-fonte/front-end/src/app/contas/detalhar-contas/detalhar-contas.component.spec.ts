import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharContasComponent } from './detalhar-contas.component';

describe('DetalharContasComponent', () => {
  let component: DetalharContasComponent;
  let fixture: ComponentFixture<DetalharContasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalharContasComponent]
    });
    fixture = TestBed.createComponent(DetalharContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

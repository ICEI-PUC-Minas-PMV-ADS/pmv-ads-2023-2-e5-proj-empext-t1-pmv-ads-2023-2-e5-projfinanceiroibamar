import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelDespesasComponent } from './rel-despesas.component';

describe('RelDespesasComponent', () => {
  let component: RelDespesasComponent;
  let fixture: ComponentFixture<RelDespesasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelDespesasComponent]
    });
    fixture = TestBed.createComponent(RelDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

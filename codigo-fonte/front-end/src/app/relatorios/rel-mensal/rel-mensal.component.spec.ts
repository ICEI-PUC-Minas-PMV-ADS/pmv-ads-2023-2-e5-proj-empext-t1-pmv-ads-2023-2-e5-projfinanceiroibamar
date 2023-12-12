import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelMensalComponent } from './rel-mensal.component';

describe('RelMensalComponent', () => {
  let component: RelMensalComponent;
  let fixture: ComponentFixture<RelMensalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelMensalComponent]
    });
    fixture = TestBed.createComponent(RelMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

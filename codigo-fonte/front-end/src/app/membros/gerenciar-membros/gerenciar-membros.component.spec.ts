import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarMembrosComponent } from './gerenciar-membros.component';

describe('GerenciarMembrosComponent', () => {
  let component: GerenciarMembrosComponent;
  let fixture: ComponentFixture<GerenciarMembrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarMembrosComponent]
    });
    fixture = TestBed.createComponent(GerenciarMembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

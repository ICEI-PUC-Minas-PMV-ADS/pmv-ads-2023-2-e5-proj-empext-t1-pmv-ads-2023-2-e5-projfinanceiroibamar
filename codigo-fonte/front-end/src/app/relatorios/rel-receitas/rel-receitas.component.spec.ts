import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelReceitasComponent } from './rel-receitas.component';

describe('RelReceitasComponent', () => {
  let component: RelReceitasComponent;
  let fixture: ComponentFixture<RelReceitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelReceitasComponent]
    });
    fixture = TestBed.createComponent(RelReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

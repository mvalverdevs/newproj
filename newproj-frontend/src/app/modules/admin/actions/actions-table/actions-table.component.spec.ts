import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTableComponent } from './actions-table.component';

describe('ActionTableComponent', () => {
  let component: ActionTableComponent;
  let fixture: ComponentFixture<ActionTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionTableComponent]
    });
    fixture = TestBed.createComponent(ActionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

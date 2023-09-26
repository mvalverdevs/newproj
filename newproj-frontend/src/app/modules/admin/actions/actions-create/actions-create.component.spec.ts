import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCreateComponent } from './actions-create.component';

describe('IndretsCreateComponent', () => {
  let component: ActionCreateComponent;
  let fixture: ComponentFixture<ActionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionCreateComponent]
    });
    fixture = TestBed.createComponent(ActionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

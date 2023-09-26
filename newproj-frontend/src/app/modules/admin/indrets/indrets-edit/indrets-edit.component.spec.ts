import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndretsEditComponent } from './indrets-edit.component';

describe('IndretsEditComponent', () => {
  let component: IndretsEditComponent;
  let fixture: ComponentFixture<IndretsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndretsEditComponent]
    });
    fixture = TestBed.createComponent(IndretsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

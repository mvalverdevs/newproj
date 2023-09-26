import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndretsFormComponent } from './indrets-form.component';

describe('IndretsFormComponent', () => {
  let component: IndretsFormComponent;
  let fixture: ComponentFixture<IndretsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndretsFormComponent]
    });
    fixture = TestBed.createComponent(IndretsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

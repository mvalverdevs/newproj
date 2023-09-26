import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndretsCreateComponent } from './indrets-create.component';

describe('IndretsCreateComponent', () => {
  let component: IndretsCreateComponent;
  let fixture: ComponentFixture<IndretsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndretsCreateComponent]
    });
    fixture = TestBed.createComponent(IndretsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

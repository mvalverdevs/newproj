import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndretsViewComponent } from './indrets-view.component';

describe('IndretsViewComponent', () => {
  let component: IndretsViewComponent;
  let fixture: ComponentFixture<IndretsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndretsViewComponent]
    });
    fixture = TestBed.createComponent(IndretsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

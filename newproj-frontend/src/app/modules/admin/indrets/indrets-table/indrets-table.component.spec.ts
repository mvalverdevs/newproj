import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndretsTableComponent } from './indrets-table.component';

describe('IndretsTableComponent', () => {
  let component: IndretsTableComponent;
  let fixture: ComponentFixture<IndretsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndretsTableComponent]
    });
    fixture = TestBed.createComponent(IndretsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndretsListComponent } from './indrets-list.component';

describe('IndretsListComponent', () => {
  let component: IndretsListComponent;
  let fixture: ComponentFixture<IndretsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndretsListComponent]
    });
    fixture = TestBed.createComponent(IndretsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

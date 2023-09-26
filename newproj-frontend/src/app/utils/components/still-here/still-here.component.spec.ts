import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StillHereComponent } from './sorting.component';

describe('SortingComponent', () => {
  let component: StillHereComponent;
  let fixture: ComponentFixture<StillHereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StillHereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StillHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

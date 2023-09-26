import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePointsComponent } from './samplePoint.component';

describe('CircuitsComponent', () => {
  let component: SamplePointsComponent;
  let fixture: ComponentFixture<SamplePointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SamplePointsComponent]
    });
    fixture = TestBed.createComponent(SamplePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

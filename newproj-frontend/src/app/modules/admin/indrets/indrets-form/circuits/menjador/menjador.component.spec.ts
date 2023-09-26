import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenjadorComponent } from './menjador.component';

describe('CircuitsComponent', () => {
  let component: MenjadorComponent;
  let fixture: ComponentFixture<MenjadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenjadorComponent]
    });
    fixture = TestBed.createComponent(MenjadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

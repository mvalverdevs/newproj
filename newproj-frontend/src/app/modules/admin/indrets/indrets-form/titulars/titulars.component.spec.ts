import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitularsComponent } from './titulars.component';

describe('TitularsComponent', () => {
  let component: TitularsComponent;
  let fixture: ComponentFixture<TitularsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitularsComponent]
    });
    fixture = TestBed.createComponent(TitularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

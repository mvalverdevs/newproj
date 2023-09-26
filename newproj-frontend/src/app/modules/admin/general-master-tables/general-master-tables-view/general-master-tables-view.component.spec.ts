import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMasterTablesViewComponent } from './general-master-tables-view.component';

describe('GeneralMasterTablesViewComponent', () => {
  let component: GeneralMasterTablesViewComponent;
  let fixture: ComponentFixture<GeneralMasterTablesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralMasterTablesViewComponent]
    });
    fixture = TestBed.createComponent(GeneralMasterTablesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

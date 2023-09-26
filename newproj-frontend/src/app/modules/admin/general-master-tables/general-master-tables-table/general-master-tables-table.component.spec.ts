import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMasterTablesTableComponent } from './general-master-tables-table.component';

describe('GeneralMasterTablesTableComponent', () => {
  let component: GeneralMasterTablesTableComponent;
  let fixture: ComponentFixture<GeneralMasterTablesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralMasterTablesTableComponent]
    });
    fixture = TestBed.createComponent(GeneralMasterTablesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

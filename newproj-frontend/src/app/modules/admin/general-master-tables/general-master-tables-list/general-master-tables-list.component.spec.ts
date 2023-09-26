import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMasterTablesListComponent } from './general-master-tables-list.component';

describe('GeneralMasterTablesListComponent', () => {
  let component: GeneralMasterTablesListComponent;
  let fixture: ComponentFixture<GeneralMasterTablesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralMasterTablesListComponent]
    });
    fixture = TestBed.createComponent(GeneralMasterTablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

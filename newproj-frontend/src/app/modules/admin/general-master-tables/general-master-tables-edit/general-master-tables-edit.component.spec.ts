import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMasterTablesEditComponent } from './general-master-tables-edit.component';

describe('GeneralMasterTablesEditComponent', () => {
  let component: GeneralMasterTablesEditComponent;
  let fixture: ComponentFixture<GeneralMasterTablesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralMasterTablesEditComponent]
    });
    fixture = TestBed.createComponent(GeneralMasterTablesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

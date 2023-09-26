import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMasterTablesFormComponent } from './general-master-tables-form.component';

describe('GeneralMasterTablesFormComponent', () => {
  let component: GeneralMasterTablesFormComponent;
  let fixture: ComponentFixture<GeneralMasterTablesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralMasterTablesFormComponent]
    });
    fixture = TestBed.createComponent(GeneralMasterTablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

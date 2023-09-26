import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMasterTablesCreateComponent } from './general-master-tables-create.component';

describe('GeneralMasterTablesCreateComponent', () => {
  let component: GeneralMasterTablesCreateComponent;
  let fixture: ComponentFixture<GeneralMasterTablesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralMasterTablesCreateComponent]
    });
    fixture = TestBed.createComponent(GeneralMasterTablesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

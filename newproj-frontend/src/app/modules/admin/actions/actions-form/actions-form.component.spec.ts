import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsFormComponent } from './actions-form.component';


describe('ActionFormComponent', () => {
  let component: ActionsFormComponent;
  let fixture: ComponentFixture<ActionsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsFormComponent]
    });
    fixture = TestBed.createComponent(ActionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

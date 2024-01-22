import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PlateFormPage } from './plate-form.page';

describe('PlateFormPage', () => {
  let component: PlateFormPage;
  let fixture: ComponentFixture<PlateFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlateFormPage],
      imports: [IonicModule.forRoot(),]
    }).compileComponents();

    fixture = TestBed.createComponent(PlateFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

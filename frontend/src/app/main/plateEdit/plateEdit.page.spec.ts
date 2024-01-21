import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PlateEditPage } from './plateEdit.page';

describe('PlateEditPage', () => {
  let component: PlateEditPage;
  let fixture: ComponentFixture<PlateEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlateEditPage],
      imports: [IonicModule.forRoot(),]
    }).compileComponents();

    fixture = TestBed.createComponent(PlateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

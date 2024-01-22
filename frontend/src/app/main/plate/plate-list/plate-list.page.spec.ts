import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PlateListPage } from './plate-list.page';

describe('PlateListPage', () => {
  let component: PlateListPage;
  let fixture: ComponentFixture<PlateListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlateListPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
